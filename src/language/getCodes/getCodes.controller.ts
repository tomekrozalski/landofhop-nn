import { Controller, Get } from '@nestjs/common';

import { GetCodesService } from './getCodes.service';
import { Code } from './code.d';

@Controller('language')
export class GetCodesController {
  constructor(private readonly getCodesService: GetCodesService) {}

  @Get()
  async getCodes() {
    const response: Code[] = await this.getCodesService.getCodes();

    return response;
  }
}
