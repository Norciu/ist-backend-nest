import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from 'src/entities/localizations/city.entity';
import { setEntityProperty } from 'src/utils/entity_serializer';
import { Repository } from 'typeorm';
import { AddCityDto } from './city.dto';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(CityEntity) private readonly city_repo: Repository<CityEntity>,
  ) {}

  public async insertCity(property: AddCityDto): Promise<CityEntity> {
    const cityEntity = setEntityProperty(new CityEntity(), property);
    return this.city_repo.save(cityEntity);
  }

  public findCity(citySimc: string): Promise<CityEntity> {
    return this.city_repo.findOne({ where: { simc: citySimc } });
  }

  public getAll(): Promise<CityEntity[]> {
    return this.city_repo.find();
  }

  public getAllCitiesForStreets(): Promise<CityEntity[]> {
    return this.city_repo.find({ select: ['id', 'cityName', 'simc'] });
  }
}
