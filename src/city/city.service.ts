import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/entities/localizations/city.entity';
import { setEntityProperty } from 'src/utils/entity_serializer';
import { Repository } from 'typeorm';
import { AddCityDto } from './city.dto';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(City) private readonly city_repo: Repository<City>,
  ) {}

  public async insertCity(property: AddCityDto): Promise<City> {
    const cityEntity = setEntityProperty(new City(), property);
    return this.city_repo.save(cityEntity);
  }

  public findCity(citySimc: string): Promise<City> {
    return this.city_repo.findOne({ where: { simc: citySimc } });
  }

  public async getAll(limit: number, offset: number): Promise<[result: City[], count: number]> {
    return this.city_repo.findAndCount({ skip: offset, take: limit });
  }

  public getAllCitiesForStreets(): Promise<City[]> {
    return this.city_repo.find({ select: ['id', 'cityName', 'simc'] });
  }
}
