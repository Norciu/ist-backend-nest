import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from 'src/entities/localizations/location.entity';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Location) private readonly location_repo: Repository<Location>,
    @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>,
    ) {}

  async getStatisticForPieChart() {
    return this.location_repo.createQueryBuilder('location')
      .select('COUNT(location.id) FILTER (WHERE available_technology_id_id IS NOT NULL AND available_type = 2)', 'connected')
      .addSelect('COUNT(location.id) FILTER (WHERE available_technology_id_id IS NOT NULL AND available_type = 1)', 'available')
      .addSelect('COUNT(location.id) FILTER (WHERE available_technology_id_id IS NULL)', 'not_available')
      .getRawMany();
  }

  async getStatisticForBarChart( ) {
    return this.pg.many(`
      SELECT
        json_agg(count ORDER BY technology_id) FILTER (WHERE type = 1) AS available,
        json_agg(count ORDER BY technology_id) FILTER (WHERE type = 2) AS connected
      FROM (
        SELECT
          available_technology_id_id AS technology_id,
          available_type AS type,
          COUNT(location.id)
        FROM localizations.location
        GROUP BY available_technology_id_id, available_type
        ORDER BY available_technology_id_id
      ) AS location_count
      `);
  }

}
