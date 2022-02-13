import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Location } from 'src/entities/localizations/location.entity';
import { setEntityProperty } from 'src/utils/entity_serializer';
import { camelToSnake } from 'src/utils/string_converter';
import { LocationOwner } from 'src/entities/localizations/location_owner.entity';
import { Geocoded } from 'src/entities/localizations/geocoded.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private readonly location_repo: Repository<Location>,
    private connection: Connection,
  ) {}

  async getLocations(limit: number, offset: number): Promise<[Location[], number]> {
    return this.location_repo.findAndCount({
      relations: ['location_owner_id', 'street_id', 'city_id', 'available_technology_id'],
      skip: offset,
      take: limit,
    });
  }

  async insertLocation(locationData) {
    const location = setEntityProperty(new Location(), locationData);
    location.available_technology_id = locationData.technology_id;
    return this.location_repo.save(location);
  }

  async insertLocationOwner(ownerData) {
    const locationOwner = setEntityProperty(new LocationOwner(), ownerData);
    return this.location_repo.save(locationOwner);
  }

  async insertLocationWithOwner(locationData) {
    const locationOwner = setEntityProperty(new LocationOwner(), camelToSnake(locationData.clientInfo));
    const location = setEntityProperty(new Location(), locationData);
    location.available_technology_id = locationData.technology_id;
    return this.connection.transaction(async tx => {
      const { id } = await tx.save(locationOwner);
      location.location_owner_id = id;
      await tx.save(location);
    });
  }

  async getLocationMarkers() {
    return this.location_repo.createQueryBuilder('location')
      .select('ARRAY[geocoded.lon, geocoded.lat]', 'coordinates')
      .leftJoin(Geocoded, 'geocoded', 'geocoded.id = location.geocoded_id')
      .getRawMany();
  }

  async getLocationLonLat(id: number) {
    return this.location_repo.createQueryBuilder('location')
      .select('ARRAY[geocoded.lon, geocoded.lat]', 'result')
      .leftJoin(Geocoded, 'geocoded', 'geocoded.id = location.geocoded_id')
      .where('location.id = :id', { id })
      .getRawOne();
  }
}
