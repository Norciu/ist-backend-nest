export interface ResultsDatasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}

export interface ResultsRank {
  importance: number;
  popularity: number;
  confidence: number;
  confidence_city_level: number;
  confidence_street_level: number;
  match_type: string;
}

export interface Results {
  datasource: ResultsDatasource;
  housenumber: string;
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
  lon: number;
  lat: number;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  result_type: string;
  rank: ResultsRank;
  place_id: string;
}

export interface ResponseQuery {
  text: string;
  pased: {
    housenumber: string;
    street: string;
    postcode: string;
    city: string;
    expected_type: string;
  }
}

export type GeocodeSearchResponse = { results: Results[], query: ResponseQuery };

export interface IAddress {
  housenumber: string;
  city: string;
  street: string;
  postcode: string;
  country: string;
}

export type AddressType = string | IAddress;
