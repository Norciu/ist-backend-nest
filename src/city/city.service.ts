import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/entities/localizations/city.entity';
import { setEntityProperty } from 'src/utils/entity_serializer';
import { ILike, Repository } from 'typeorm';
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

  public searchCity(param: string) {
    const p = ILike(`%${param}%`);
    return this.city_repo.findAndCount({ where: [{ simc: p }, { cityName: p }, { postalCode: p }], take: 10 });
  }

  public async getAll(limit: number, offset: number): Promise<[result: City[], count: number]> {
    return this.city_repo.findAndCount({ skip: offset, take: limit });
  }

  public getAllCitiesForStreets(): Promise<City[]> {
    return this.city_repo.find({ select: ['id', 'cityName', 'simc'] });
  }

  getCityAndStreetInfo(city_id: number, street_id: number): Promise<City> {
    return this.city_repo.findOne({ relations: ['streets'], where: { id: city_id, streets: street_id } });
  }

  public async updatePostalCode(city_id: number, postalCode) {
    return this.city_repo.createQueryBuilder().update(City).set({ postalCode }).where({ id: city_id }).execute();
  }
}
