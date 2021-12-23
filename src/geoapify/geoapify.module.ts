import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GeoapifyService } from './geoapify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geocoded } from 'src/entities/localizations/geocoded.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Geocoded]),
  ],
  providers: [GeoapifyService],
  exports: [GeoapifyService],
})
export class GeoapifyModule {}
