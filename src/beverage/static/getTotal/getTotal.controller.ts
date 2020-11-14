import { Controller, Get } from '@nestjs/common';

import { GetTotalService } from './getTotal.service';

@Controller('beverage')
export class GetTotalController {
  constructor(private readonly beverageService: GetTotalService) {}

  @Get('total')
  async getTotal(): Promise<number> {
    const total: number = await this.beverageService.getTotal();
    return total;
  }
}
