import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from 'src/entities/localizations/location.entity';

@Injectable()
export class StatisticService {
  constructor(@InjectRepository(Location) private readonly location_repo: Repository<Location>) {}

  async getStatisticForPieChart() {
    return this.location_repo.createQueryBuilder('location')
      .select('COUNT(location.id) FILTER (WHERE available_technology_id_id IS NOT NULL AND available_type = 2)', 'connected')
      .addSelect('COUNT(location.id) FILTER (WHERE available_technology_id_id IS NOT NULL AND available_type = 1)', 'available')
      .addSelect('COUNT(location.id) FILTER (WHERE available_technology_id_id IS NULL)', 'not_available')
      .getRawMany();
  }

  async getStatisticForBarChart() {
    return this.location_repo.createQueryBuilder('location')
      .select('COUNT(location.id) FILTER (WHERE available_technology_id_id = 1)', 'fiber_optic')
      .addSelect('COUNT(location.id) FILTER (WHERE available_technology_id_id = 2)', 'GSM')
      .addSelect('COUNT(location.id) FILTER (WHERE available_technology_id_id = 3)', 'Radio')
      .addSelect('COUNT(location.id) FILTER (WHERE available_technology_id_id = 4)', 'Ethrenet')
      .addSelect('COUNT(location.id) FILTER (WHERE available_technology_id_id = 5)', 'Docsis')
      .getRawMany();
  }

}
