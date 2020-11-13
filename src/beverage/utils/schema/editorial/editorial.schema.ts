import * as mongoose from 'mongoose';

import { priceSchema } from '../common';
import brewingSchema from './brewing.schema';
import generalSchema from './general.schema';
import impressionsSchema from './impressions.schema';
import photosSchema from './photos.schema';

const editorialSchema = new mongoose.Schema(
  {
    general: generalSchema,
    brewing: brewingSchema,
    impressions: impressionsSchema,
    price: {
      type: [priceSchema],
      default: undefined,
    },
    photos: photosSchema,
    notes: String,
  },
  { _id: false },
);

export default editorialSchema;
