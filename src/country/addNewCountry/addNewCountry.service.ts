import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Country } from 'country/utils/types';

@Injectable()
export class AddNewCountryService {
  constructor(
    @InjectModel('Country')
    private readonly countryModel: Model<Country>,
  ) {}

  async addNewCountry({ code, name }) {
    const newCountry = new this.countryModel({
      code,
      name: name.map(({ language, value }) => ({
        ...(language !== 'none' && { language }),
        value,
      })),
    });

    await newCountry.save();

    const updatedCountries = await this.countryModel.getAllCountries();
    return updatedCountries;
  }
}
