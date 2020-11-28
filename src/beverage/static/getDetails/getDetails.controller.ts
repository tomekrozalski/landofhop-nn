import { Controller, Get, Param } from '@nestjs/common';

import { AugmentedDetails } from 'beverage/utils/types';
import { GetDetailsService } from './getDetails.service';

@Controller('beverage')
export class GetDetailsController {
  constructor(private readonly beverageService: GetDetailsService) {}

  @Get('details/:language/:shortId/:brand/:name')
  async getDetails(
    @Param('language') language,
    @Param('shortId') shortId,
    @Param('brand') brand,
    @Param('name') name,
  ): Promise<AugmentedDetails> {
    const beverage: AugmentedDetails = await this.beverageService.getDetails({
      language,
      shortId,
      brand,
      name,
    });
    return beverage;
  }
}
