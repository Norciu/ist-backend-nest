import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AddressType, GeocodeSearchResponse, Results } from './geoapify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Geocoded } from 'src/entities/localizations/geocoded.entity';
import { Repository } from 'typeorm';
import { setEntityProperty } from 'src/utils/entity_serializer';
import { parseAddress } from 'src/utils/address_parser';

@Injectable()
export class GeoapifyService {

  private readonly apiKey = process.env.GEOAPIFY_API_KEY;
  private readonly geoapifyUrl = 'https://geoapify.com/api/v1';

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
    const geo = setEntityProperty(new Geocoded(), geocoded);
    return this.geocoded_repo.save(geo);
  }

  async getLocationInfoAndSave(address: AddressType): Promise<Geocoded> {
    const { results } = await this.getLocationInfo(address);
    return this.saveGeocoded(results);
  }

}
