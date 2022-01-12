import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CityService } from 'src/city/city.service';
import { GeoapifyService } from 'src/geoapify/geoapify.service';
import { StreetService } from 'src/street/street.service';
import { InsertLocationDto } from './locations.dto';
import { LocationsService } from './locations.service';

@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {

  constructor(
    private readonly locationsService: LocationsService,
    private readonly geoapifyService: GeoapifyService,
    private readonly streetService: StreetService,
    private readonly cityService: CityService,
  ) {}

  @Get('getAll')
  async getLocations(@Param() { limit = 10, offset = 0 }) {
    const [result, total] = await this.locationsService.getLocations(limit, offset);
    return { success: true, result, total };
  }

  @Put('insert')
  async insertLocation(@Body() body: InsertLocationDto) {
    const { homeNo: house_number, city_id, street_id } = body;

    const { city_id: city, streetName: street_name } = await this.streetService.getCityAndStreetInfo(city_id, street_id);

    let geocoded = await this.geoapifyService.findGeocodedInDatabase({
      city_name: city['cityName'],
      street_name,
      house_number,
    });

    if (!geocoded || !Object.keys(geocoded).length) {
      geocoded = await this.geoapifyService.getLocationInfoAndSave(`${street_name} ${house_number}, ${city['cityName']}`);
      await this.cityService.updatePostalCode(city_id, geocoded['postcode']);
    }

    body['geocoded'] = geocoded.id;

    if (body.clientInfo) {
      await this.locationsService.insertLocationWithOwner(body);
      return { success: true };
    }

    await this.locationsService.insertLocation(body);

    return { success: true };
  }

  @Get('getAllMarkers')
  async getLocationMarkers() {
    const coordinates = await this.locationsService.getLocationMarkers();
    return { success: true, coordinates };
  }
}
