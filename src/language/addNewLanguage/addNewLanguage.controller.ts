import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { Language } from 'language/utils/types';
import { AddNewLanguageService } from './addNewLanguage.service';

@Controller('language')
export class AddNewLanguageController {
  constructor(private readonly languageService: AddNewLanguageService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addNewLanguage(
    @Body('code') code: string,
    @Body('name')
    name: {
      lang: string;
      value: string;
    }[],
  ) {
    const response: Language[] = await this.languageService.addNewLanguage({
      code,
      name,
    });

    return response;
  }
}
