import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatisticService } from './statistic.service';

@UseGuards(JwtAuthGuard)
@Controller('statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @Get('pieChart')
  async pieChart() {
    const [result] = await this.statisticService.getStatisticForPieChart();
    return { success: true, result };
  }

  @Get('barChart')
  async barChart() {
    const [result] = await this.statisticService.getStatisticForBarChart();
    return { success: true, result };
  }
}
