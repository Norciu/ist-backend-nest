import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocationsService } from './locations.service';

@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {

  constructor(
    private readonly locationsService: LocationsService,
  ) {}

  @Get('getAll')
  async getLocations() {
    return this.locationsService.getLocations();
  }
}
