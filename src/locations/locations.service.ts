import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from 'src/entities/localizations/location.entity';
import { LocationOwner } from 'src/entities/localizations/location_owner.entity';
import { Street } from 'src/entities/localizations/street.entity';
import { City } from 'src/entities/localizations/city.entity';
import { Technology } from 'src/entities/localizations/technology.entity';

@Injectable()
export class LocationsService {
  constructor(@InjectRepository(Location) private readonly location_repo: Repository<Location>) {}

  async getLocations() {
    const result = await this.location_repo.createQueryBuilder()
      .select('location.id', 'id')
      .from(Location, 'location')
      .leftJoinAndSelect(LocationOwner, 'location_owner', 'location_owner.id = location.location_owner_id')
      .leftJoinAndSelect(Street, 'str', 'str.id = location.street_id')
      .leftJoinAndSelect(City, 'cty', 'cty.id = str.city_id')
      .leftJoinAndSelect(Technology, 'tech', 'tech.id = location.available_technology_id')
      .getMany();
    const count = await this.location_repo.count();

    return { result, count };
  }
}
