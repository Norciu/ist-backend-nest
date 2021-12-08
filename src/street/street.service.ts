import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Street } from 'src/entities/localizations/street.entity';
import { InsertStreetDto } from './street.dto';

@Injectable()
export class StreetService {
  constructor(
    @InjectRepository(Street) private readonly street_repo: Repository<Street>,
  ) {}

  public async insertStreet(data: InsertStreetDto): Promise<Street> {
    const { cityId, streetName, ulic } = data;
    const street: Street = new Street();
    street.city = cityId;
    street.streetName = streetName;
    street.ulic = ulic;
    return this.street_repo.save(street);
  }

  public async getAvailableStreets(): Promise<Street[]> {
    return this.street_repo.find({ relations: ['city'] });
  }

  async getStreetsForCity(cityId: number): Promise<Street[]> {
    return this.street_repo.find({ where: { city: cityId } });
  }

  async getStreetsByCitySimc(citySimc: string) {
    return this.street_repo.createQueryBuilder('street')
      .leftJoinAndSelect('street.city', 'city')
      .where('city.simc = :citySIMC', { citySimc })
      .getMany();
  }
}
