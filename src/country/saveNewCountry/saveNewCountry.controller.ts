import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { SaveNewCountryService } from './saveNewCountry.service';

@Controller('country')
export class SaveNewCountryController {
  constructor(private readonly countryService: SaveNewCountryService) {}

  @Post()
  @UseGuards(AuthGuard)
  async savePlace(
    @Body('code') code: string,
    @Body('name')
    name: {
      lang: string;
      value: string;
    }[],
  ) {
    const result: boolean = await this.countryService.saveCountry({
      code,
      name,
    });

    return result;
  }
}
