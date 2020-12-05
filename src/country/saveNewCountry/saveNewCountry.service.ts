import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Country } from 'country/utils/types';

@Injectable()
export class SaveNewCountryService {
  constructor(
    @InjectModel('Country')
    private readonly countryModel: Model<Country>,
  ) {}

  async saveCountry({ code, name }) {
    const newCountry = new this.countryModel({
      code,
      name: name.map(({ lang, value }) => ({
        ...(lang !== 'none' && { language: lang }),
        value,
      })),
    });

    await newCountry.save();
    return true;
  }
}
