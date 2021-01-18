import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { AddNewCountryService } from './addNewCountry.service';

@Controller('country')
export class AddNewCountryController {
  constructor(private readonly countryService: AddNewCountryService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addNewCountry(
    @Body('code') code: string,
    @Body('name')
    name: {
      lang: string;
      value: string;
    }[],
  ) {
    const result: boolean = await this.countryService.addNewCountry({
      code,
      name,
    });

    return result;
  }
}
