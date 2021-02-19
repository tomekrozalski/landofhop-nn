import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { OutlinesService } from './outlines.service';

@Controller('beverage')
export class OutlinesController {
  constructor(private readonly beverageService: OutlinesService) {}

  @Get('update-cover-outline/:id/:shortId/:brand/:badge')
  @UseGuards(AuthGuard)
  async updateCoverOutline(
    @Param('badge') badge: string,
    @Param('brand') brand: string,
    @Param('id') id: string,
    @Param('shortId') shortId: string,
  ) {
    const result = this.beverageService.updateCoverOutline({
      badge,
      brand,
      id,
      shortId,
    });
    return result;
  }

  @Get('update-container-outline/:id/:shortId/:brand/:badge')
  @UseGuards(AuthGuard)
  async updateContainerOutline(
    @Param('badge') badge: string,
    @Param('brand') brand: string,
    @Param('id') id: string,
    @Param('shortId') shortId: string,
  ) {
    const result = this.beverageService.updateContainerOutline({
      badge,
      brand,
      id,
      shortId,
    });
    return result;
  }
}
