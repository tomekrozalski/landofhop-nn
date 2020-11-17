import { Controller, Get, Param } from '@nestjs/common';

import { AugmentedDetails } from 'beverage/utils/types';
import { GetDetailsService } from './getDetails.service';

@Controller('beverage')
export class GetDetailsController {
  constructor(private readonly beverageService: GetDetailsService) {}

  @Get('details/:shortId/:brand/:name')
  async getDetails(
    @Param('shortId') shortId,
    @Param('brand') brand,
    @Param('name') name,
  ): Promise<AugmentedDetails> {
    const beverage: AugmentedDetails = await this.beverageService.getDetails({
      shortId,
      brand,
      name,
    });
    return beverage;
  }
}
