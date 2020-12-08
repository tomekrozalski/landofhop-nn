import { Controller, Get, Param } from '@nestjs/common';

import { Stats } from 'beverage/utils/types';
import { GetDataForStatsService } from './getDataForStats.service';

@Controller('beverage')
export class GetDataForStatsController {
  constructor(private readonly beverageService: GetDataForStatsService) {}

  @Get('stats/:language')
  async getDataForStats(@Param('language') language): Promise<Stats> {
    const data: Stats = await this.beverageService.getDataForStats({
      language,
    });

    return data;
  }
}
