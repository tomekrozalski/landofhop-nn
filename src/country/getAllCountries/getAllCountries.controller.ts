import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { Country } from '../types';
import { GetAllCountriesService } from './getAllCountries.service';

@Controller('country')
export class GetAllCountriesController {
  constructor(private readonly countryService: GetAllCountriesService) {}

  @Get()
  async getAllCountries() {
    const countries: Country[] = await this.countryService.getAllCountries();
    return countries;
  }
}
