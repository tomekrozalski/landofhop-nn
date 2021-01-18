import { Controller, Get } from '@nestjs/common';

import { Country } from 'country/utils/types';
import { GetAllCountriesService } from './getAllCountries.service';

@Controller('country')
export class GetAllCountriesController {
  constructor(private readonly countryService: GetAllCountriesService) {}

  @Get('getAll')
  async getAllCountries() {
    const countries: Country[] = await this.countryService.getAllCountries();
    return countries;
  }
}
