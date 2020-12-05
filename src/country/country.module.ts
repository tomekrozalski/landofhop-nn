import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import CountrySchema from 'country/utils/country.schema';
import {
  GetAllCountriesController,
  GetAllCountriesService,
} from './getAllCountries';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Country', schema: CountrySchema }]),
  ],
  controllers: [GetAllCountriesController],
  providers: [GetAllCountriesService],
})
export class CountryModule {}
