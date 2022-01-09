import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { Location } from 'src/entities/localizations/location.entity';
import { GeoapifyModule } from 'src/geoapify/geoapify.module';
import { StreetModule } from 'src/street/street.module';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    StreetModule,
    CityModule,
    GeoapifyModule,
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
