import { Controller, Get, Param } from '@nestjs/common';

import { Basics } from 'beverage/utils/types';
import { GetBasicsService } from './getBasics.service';

@Controller('beverage')
export class GetBasicsController {
  constructor(private readonly beverageService: GetBasicsService) {}

  @Get('basics/:skip?/:limit?')
  async getBasics(
    @Param('limit') limit,
    @Param('skip') skip,
  ): Promise<Basics[]> {
    const beverages: Basics[] = await this.beverageService.getBasics({
      limit,
      skip,
    });
    return beverages;
  }
}
