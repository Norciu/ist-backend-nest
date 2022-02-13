import dotenv from 'dotenv';
import axios from 'axios';
import pgp from 'pg-promise';
dotenv.config();

const geoapify_key = process.env.GEOAPIFY_API_KEY;

let counter = 0;

const random_loc_counter = 400;

const lib = pgp({
  query(e) {
    console.log(e.query);
  },
});

const db = lib({
  host: '127.0.0.1',
  port: 5432,
  database: 'ist',
  user: 'ist',
  password: 'ist',
});

const { geocoded_columns } = await db.one(`
    SELECT
          json_agg(column_name) AS geocoded_columns
    FROM information_schema.columns
    WHERE table_schema = 'localizations' AND table_name = 'geocoded'
      AND column_name NOT IN ('id', 'created_at', 'updated_at')
`);

const { min, max } = await db.one('SELECT min(id), max(id) FROM localizations.technology');

const getRandomTechnology = (available) => {
  return available !== 3 ? Math.floor(Math.random() * (max - min + 1)) + min : null;
};

const parseAddress = (address) => {
  if (typeof address === 'string') {
    return encodeURIComponent(address);
  }
  const { housenumber, street, city, postcode, country } = address;
  const parsedAddress = `${street} ${housenumber}, ${postcode} ${city}, ${country}`;
  return encodeURIComponent(parsedAddress);
};

const getRandomStreets = async (limit = 500) => {
  return db.many(`
      SELECT data.*,
            floor(random() * (25-1+1) + 1) AS house_number,
            floor(random() * (3-1+1) + 1) AS available
      FROM (SELECT
          lc.id AS city_id,
          lc.city_name,
          lc.postal_code,
          lc.simc AS city_simc,
          ls.id AS street_id,
          ls.street_name,
          ls.ulic AS street_ulic
      FROM localizations.street ls
      LEFT JOIN localizations.city lc ON lc.id = ls.city_id_id
      ORDER BY random()
      LIMIT $[limit]) data`,
      { limit });
};

const insertLocationWithGeocoded = async (city_id, street_id, house_number, geocoded_id, available) => {
  const available_technology_id = getRandomTechnology(available);
  return db.one(`
        INSERT INTO localizations.location
        (city_id_id, street_id_id, home_no, geocoded_id, available_technology_id_id)
        VALUES
        ($[city_id], $[street_id], $[house_number], $[geocoded_id], $[available_technology_id])
        RETURNING *`, { city_id, street_id, house_number, geocoded_id, available_technology_id });
};

const findGeocodedInDatabase = async (city_name, street_name, house_number) => {
  return db.manyOrNone(`
    SELECT * FROM localizations.geocoded WHERE city = $[city_name] AND street = $[street_name] AND house_number = '$[house_number]'
  `, { city_name, street_name, house_number });
};

const getLocationInfo = async (city_name, street_name, house_number) => {
  const encodedAddress = parseAddress(`${street_name} ${house_number}, ${city_name}`);

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&format=json&api_key=${geoapify_key}`;

  return axios.get(url);
};

const buildGeocodedColumnsAndData = (location) => {
  const data = geocoded_columns.reduce((acc, curr) => {
    if (curr === 'house_number') {
      acc['house_number'] = location['housenumber'] || '0';
      return acc;
    }
    if (curr === 'post_code') {
      acc['post_code'] = location['postcode'] || '99-999';
      return acc;
    }
    acc[curr] = location[curr];
    return acc;
  }, {});
  const columns = geocoded_columns.join(',');
  const values = geocoded_columns.map(key => `$[${key}]`).join(',');
  return {
    data,
    columns,
    values,
  };
};

const saveGeocoded = async (data) => {
  const { data: geocoded, columns, values } = buildGeocodedColumnsAndData(data);
  return db.one(`INSERT INTO localizations.geocoded (${columns}) VALUES (${values}) RETURNING *`, geocoded);
};

getRandomStreets(random_loc_counter).then(async data => {
  for (const row of data) {
    const geocoded = await findGeocodedInDatabase(row.city_name, row.street_name, row.house_number);

    if (!geocoded || !Object.keys(geocoded).length) {
      const { data: { results } } = await getLocationInfo(row.city_name, row.street_name, row.house_number);

      const sort = results.sort((a, b) => b.rank.confidence - a.rank.confidence);

      const { id: geocoded_id } = await saveGeocoded(sort.shift());

      await insertLocationWithGeocoded(row.city_id, row.street_id, row.house_number, geocoded_id, row.available);

    } else {
      // row.available === 3 means that the location is not available to connect
      await insertLocationWithGeocoded(row.city_id, row.street_id, row.house_number, geocoded[0].id, row.available);
    }

    // 3 sec wait before next request
    counter += 1;
    console.log('\x1b[36m%s\x1b[0m', `Inserted ${counter} location from ${random_loc_counter}`);
    console.log('\x1b[33m%s\x1b[0m', `${random_loc_counter - counter} left`);
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
});
