import { Controller, Put, Res, UseGuards, Body, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InsertTechnologyDto } from './technology.dto';
import { TechnologyService } from './technology.service';

@UseGuards(JwtAuthGuard)
@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Put('insert')
  async insertNew(@Body() body: InsertTechnologyDto, @Res() res) {
    const { technologyName } = body;
    await this.technologyService.insertToDatabase(technologyName);
    const [result, total] = await this.technologyService.getAvailable(10, 0);
    return res.status(200).send({ success: true, result, total });
  }

  @Get('getAll')
  async getAll(@Query() { limit = 10, offset = 0 }, @Res() res) {
    const [result, total] = await this.technologyService.getAvailable(limit, offset);
    return res.status(200).send({ success: true, result, total });
  }
}
