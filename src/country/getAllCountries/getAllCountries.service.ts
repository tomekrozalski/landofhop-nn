import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Country } from 'country/utils/types';

@Injectable()
export class GetAllCountriesService {
  constructor(
    @InjectModel('Country')
    private readonly countryModel: Model<Country>,
  ) {}

  async getAllCountries() {
    const countries: Country[] = await this.countryModel.getAllCountries();
    return countries;
  }
}
