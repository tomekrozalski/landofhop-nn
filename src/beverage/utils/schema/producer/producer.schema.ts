import * as mongoose from 'mongoose';

import {
  brewingSchema,
  impressionsSchema,
  ingredientsSchema,
  priceSchema,
} from '../common';
import generalSchema from './general.schema';

const producerSchema = new mongoose.Schema(
  {
    general: generalSchema,
    brewing: brewingSchema,
    ingredients: ingredientsSchema,
    impressions: impressionsSchema,
    price: {
      type: [priceSchema],
      default: undefined,
    },
  },
  { _id: false },
);

export default producerSchema;
