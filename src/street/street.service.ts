import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Street } from 'src/entities/localizations/street.entity';
import { InsertStreetDto } from './street.dto';
import { setEntityProperty } from 'src/utils/entity_serializer';

@Injectable()
export class StreetService {
  constructor(
    @InjectRepository(Street) private readonly street_repo: Repository<Street>,
  ) {}

  public async insertStreet(data: InsertStreetDto): Promise<Street> {
    const street: Street = setEntityProperty(new Street(), data);
    return this.street_repo.save(street);
  }

  public async getAvailableCityWithStreets(limit: number, offset: number, id?: number): Promise<[Street[], number]> {
    if (id) {
      this.street_repo.findAndCount({ relations: ['city_id'], skip: offset, take: limit, where: { city_id: id } });
    }
    return this.street_repo.findAndCount({ relations: ['city_id'], skip: offset, take: limit });
  }

  async getStreetsForCity(cityId: number): Promise<[Street[], number]> {
    return this.street_repo.findAndCount({ relations: ['city_id'], where: { city_id: cityId } });
  }

  async getStreetsByCitySimc(citySimc: string) {
    return this.street_repo.createQueryBuilder('street')
      .leftJoinAndSelect('street.city', 'city')
      .where('city.simc = :citySIMC', { citySimc })
      .getMany();
  }

  async filterStreetsForCity(cityId: number, strName: string) {
    const streetName = ILike(`%${strName}%`);
    return this.street_repo.findAndCount({ where: { city_id: cityId, streetName } });
  }

  getCityAndStreetInfo(city_id: number, street_id: number): Promise<Street> {
    return this.street_repo.findOne({ relations: ['city_id'], where: { id: street_id, city_id } });
  }
}
