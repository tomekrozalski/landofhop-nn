import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import CountrySchema from 'country/utils/country.schema';
import { AddNewCountryController, AddNewCountryService } from './addNewCountry';
import {
  GetAllCountriesController,
  GetAllCountriesService,
} from './getAllCountries';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Country', schema: CountrySchema }]),
  ],
  controllers: [AddNewCountryController, GetAllCountriesController],
  providers: [AddNewCountryService, GetAllCountriesService],
})
export class CountryModule {}
