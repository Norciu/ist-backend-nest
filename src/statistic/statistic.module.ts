import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { Location } from 'src/entities/localizations/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
