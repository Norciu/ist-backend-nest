import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from 'src/entities/localizations/technology.entity';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(Technology) private readonly technology_repo: Repository<Technology>,
  ) {}

  public async insertToDatabase(technologyName: string): Promise<Technology> {
    const tech = new Technology();
    tech.technologyName = technologyName;
    return this.technology_repo.save(tech);
  }

  public async getAvailable(limit: number, offset: number): Promise<[Technology[], number]> {
    return this.technology_repo.findAndCount({ take: limit, skip: offset });
  }

  public async findTechnology(techName: string): Promise<Technology | undefined> {
    return this.technology_repo.findOne({ where: { technologyName: techName } });
  }
}
