import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { AugmentedDetails } from 'beverage/utils/types';
import { GetDashboardDetailsService } from './getDashboardDetails.service';

@Controller('beverage/admin/dashboard')
export class GetDashboardDetailsController {
  constructor(private readonly beverageService: GetDashboardDetailsService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  async getDashboardDetails(@Param('id') id): Promise<AugmentedDetails> {
    const beverage: AugmentedDetails = await this.beverageService.getDashboardDetails(
      id,
    );

    return beverage;
  }
}
