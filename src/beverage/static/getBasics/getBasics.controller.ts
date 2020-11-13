import { Controller, Get } from '@nestjs/common';

import { Basics } from 'beverage/utils/types';
import { GetBasicsService } from './getBasics.service';

@Controller('beverage')
export class GetBasicsController {
  constructor(private readonly beverageService: GetBasicsService) {}

  @Get('basics')
  async getBasics(): Promise<Basics[]> {
    const beverages: Basics[] = await this.beverageService.getBasics();
    return beverages;
  }
}
