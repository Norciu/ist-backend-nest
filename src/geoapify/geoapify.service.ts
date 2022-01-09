import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AddressType, GeocodeSearchResponse, Results } from './geoapify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Geocoded } from 'src/entities/localizations/geocoded.entity';
import { ILike, Like, Repository } from 'typeorm';
import { setEntityProperty } from 'src/utils/entity_serializer';
import { parseAddress } from 'src/utils/address_parser';

@Injectable()
export class GeoapifyService {

  private readonly apiKey = process.env.GEOAPIFY_API_KEY;
  private readonly geoapifyUrl = 'https://api.geoapify.com/v1';

  constructor(
    @InjectRepository(Geocoded) private readonly geocoded_repo: Repository<Geocoded>,
    private http: HttpService,
    ) { }

  async getLocationInfo(address: AddressType): Promise<GeocodeSearchResponse> {
    const encodedAddress = parseAddress(address);
    const url = `${this.geoapifyUrl}/geocode/search?text=${encodedAddress}&format=json&api_key=${this.apiKey}`;

    const { data } = await this.http.get<GeocodeSearchResponse>(url).toPromise();
    return data;
  }

  async saveGeocoded(geocoded: Results[]): Promise<Geocoded> {
    const sort = geocoded.sort((a, b) => b.rank.confidence - a.rank.confidence);
    const geo = setEntityProperty(new Geocoded(), sort.shift());
    const geocoded_rest_data = sort.map(item => this.geocoded_repo.save(setEntityProperty(new Geocoded(), item)));
    Promise.race(geocoded_rest_data);
    return this.geocoded_repo.save(geo);
  }

  async getLocationInfoAndSave(address: AddressType): Promise<Geocoded> {
    const { results } = await this.getLocationInfo(address);
    return this.saveGeocoded(results);
  }

  async findGeocodedInDatabase(body: { city_name: string, postal_code?: string, street_name: string, house_number: string }): Promise<Geocoded> {
    const where = {
      housenumber: ILike(`%${body.house_number}%`),
      city: ILike(`%${body.city_name}%`),
      street: ILike(`%${body.street_name}%`),
    };

    if (body.postal_code) {
      where['postcode'] = Like(`%${body.postal_code}%`);
    }

    return this.geocoded_repo.findOne({
       where: [where, { city: ILike(`%${body.city_name}%`), street: ILike(`%${body.street_name}%`) }],
       order: { housenumber: 'ASC' },
      });
  }

}
