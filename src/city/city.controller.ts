import { Body, Controller, Get, Put, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddCityDto } from './city.dto';
import { CityService } from './city.service';

@UseGuards(JwtAuthGuard)
@Controller('city')
export class CityController {
  constructor(
    private readonly cityService: CityService,
  ) {}

  @Put('insert')
  async insertCity(@Body() body: AddCityDto, @Res() res) {
    const result = await this.cityService.insertCity(body);
    return res.status(200).send({ success: true, result });
  }

  @Get('getAll')
  async getAll(@Query() query, @Res() res) {
    const { limit = 10, offset = 0 } = query;
    const [result, count] = await this.cityService.getAll(limit, offset);
    return res.status(200).send({ success: true, result, count });
  }
}
