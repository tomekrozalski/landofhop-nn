import { Controller, Get, Param } from '@nestjs/common';

import { AugmentedDetails } from 'beverage/utils/types';
import { GetDetailsService } from './getDetails.service';

@Controller('beverage')
export class GetDetailsController {
  constructor(private readonly beverageService: GetDetailsService) {}

  @Get('details/:id')
  async getDetails(@Param('id') id): Promise<AugmentedDetails> {
    const beverage: AugmentedDetails = await this.beverageService.getDetails(
      id,
    );
    return beverage;
  }
}
