import { Body, Controller, Delete, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { RemoveBeverageService } from './removeBeverage.service';

@Controller('beverage')
export class RemoveBeverageController {
  constructor(private readonly beverageService: RemoveBeverageService) {}

  @Delete()
  @UseGuards(AuthGuard)
  async removeBeverage(@Body('id') id: string) {
    const report = await this.beverageService.removeBeverage(id);

    return report;
  }
}
