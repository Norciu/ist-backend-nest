import { Body, Controller, Get, Param, Put, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InsertStreetDto } from './street.dto';
import { StreetService } from './street.service';

@UseGuards(JwtAuthGuard)
@Controller('street')
export class StreetController {
  constructor(
    private readonly streetService: StreetService,
  ) {}

  @Put('insert')
  async insertStreet(@Body() body: InsertStreetDto, @Res() res) {
    const result = await this.streetService.insertStreet(body);
    return res.status(200).send({ success: true, result });
  }

  @Get('getAll')
  async getAvailableStreets(@Query() { limit = 10, offset = 0, id }, @Res() res) {
    const [result, total] = await this.streetService.getAvailableCityWithStreets(limit, offset, id);
    return res.status(200).send({ success: true, result, total });
  }

  @Get('search/:simc')
  async searchStreet(@Param('simc') simc: string, @Res() res) {
    const result = await this.streetService.getStreetsByCitySimc(simc);
    return res.status(200).send({ success: true, result });
  }

  @Get('streets/:cityId')
  async getStreetsForCity(@Param('cityId') id: number, @Res() res) {
    const [result, total] = await this.streetService.getStreetsForCity(id);
    return res.status(200).send({ success: true, result, total });
  }
}
