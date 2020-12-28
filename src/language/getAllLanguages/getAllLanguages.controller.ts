import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { Language } from 'language/utils/types';
import { GetAllLanguagesService } from './getAllLanguages.service';

@Controller('language')
export class GetAllLanguagesController {
  constructor(private readonly getCodesService: GetAllLanguagesService) {}

  @Get('getAll')
  @UseGuards(AuthGuard)
  async getAllLanguages() {
    const response: Language[] = await this.getCodesService.getAllLanguages();

    return response;
  }
}
