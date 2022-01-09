import { Body, Controller, Get, Param, Put, Query, Res, UseGuards } from '@nestjs/common';
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
    const inserted = await this.cityService.insertCity(body);
    const [result, total] = await this.cityService.getAll(10, 0);
    return res.status(200).send({ success: true, inserted, result, total });
  }

  @Get('getAll')
  async getAll(@Query() query, @Res() res) {
    const { limit = 10, offset = 0 } = query;
    const [result, total] = await this.cityService.getAll(limit, offset);
    return res.status(200).send({ success: true, result, total });
  }

  @Get('find/:param')
  async searchCity(@Param('param') param: string, @Res() res) {
    const [result, total] = await this.cityService.searchCity(param);
    return res.status(200).send({ success: true, result, total });
  }
}
