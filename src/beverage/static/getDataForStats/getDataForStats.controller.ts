import { Controller, Get, Param } from '@nestjs/common';

import { DataForStats } from 'beverage/utils/types';
import { GetDataForStatsService } from './getDataForStats.service';

@Controller('beverage')
export class GetDataForStatsController {
  constructor(private readonly beverageService: GetDataForStatsService) {}

  @Get('stats/:language')
  async getDataForStats(@Param('language') language): Promise<DataForStats> {
    const data: DataForStats = await this.beverageService.getDataForStats({
      language,
    });

    return data;
  }
}
