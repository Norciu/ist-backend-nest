import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Street } from 'src/entities/localizations/street.entity';
import { StreetController } from './street.controller';
import { StreetService } from './street.service';

@Module({
  imports: [TypeOrmModule.forFeature([Street])],
  controllers: [StreetController],
  providers: [StreetService],
})
export class StreetModule {}
