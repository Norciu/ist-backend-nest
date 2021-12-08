import { Controller, Put, Res, UseGuards, Body, Get } from '@nestjs/common';
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
    const result = await this.technologyService.insertToDatabase(technologyName);
    return res.status(200).send({ success: true, result });
  }

  @Get('getAll')
  async getAll(@Res() res) {
    const result = await this.technologyService.getAvailable();
    return res.status(200).send({ success: true, result });
  }
}
