import * as mongoose from 'mongoose';

import { langValue } from 'utils/schema';
import { getAllCountriesQuery } from './getAllCountries';

const countrySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: [langValue],
    required: true,
  },
});

countrySchema.index({ code: 1 }, { unique: true });
countrySchema.statics.getAllCountries = getAllCountriesQuery;

export default countrySchema;
