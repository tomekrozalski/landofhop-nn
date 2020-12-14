import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { RawData } from 'beverage/admin/getAdminDetails/RawData';
import { GetAdminDetailsService } from './getAdminDetails.service';

@Controller('beverage')
export class GetAdminDetailsController {
  constructor(private readonly beverageService: GetAdminDetailsService) {}

  @Get('admin/details/:id')
  @UseGuards(AuthGuard)
  async getDetails(@Param('id') id): Promise<RawData> {
    const details: RawData = await this.beverageService.getAdminDetails({
      id,
    });

    return details;
  }
}
