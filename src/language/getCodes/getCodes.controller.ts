import { Controller, Get } from '@nestjs/common';

import { Code } from 'language/utils/types';
import { GetCodesService } from './getCodes.service';

@Controller('language')
export class GetCodesController {
  constructor(private readonly getCodesService: GetCodesService) {}

  @Get()
  async getCodes() {
    const response: Code[] = await this.getCodesService.getCodes();

    return response;
  }
}
