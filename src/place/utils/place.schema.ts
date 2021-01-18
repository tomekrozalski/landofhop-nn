import * as mongoose from 'mongoose';

import { langValue } from 'utils/schema';
import { getAllPlacesQuery } from 'place/getAllPlaces';

const placeSchema = new mongoose.Schema({
  city: {
    type: [langValue],
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution',
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [mongoose.Schema.Types.Decimal128],
      default: undefined,
    },
    required: false,
  },
  shortId: {
    type: String,
    required: true,
  },
});

placeSchema.index({ shortId: 1 }, { unique: true });
placeSchema.statics.getAllPlaces = getAllPlacesQuery;

export default placeSchema;
