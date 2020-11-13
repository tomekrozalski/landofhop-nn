import * as mongoose from 'mongoose';

import { langValue } from 'utils/schema';
import { AlcoholScope, Category, Fermentation } from 'beverage/utils/enums';
import { agedSchema } from '../common';

const brewingSchema = new mongoose.Schema(
  {
    beverageType: {
      type: String,
      enum: Object.values(Category),
    },
    fermentation: {
      type: [
        {
          type: String,
          enum: Object.values(Fermentation),
        },
      ],
      default: undefined,
    },
    alcohol: {
      scope: {
        type: String,
        enum: Object.values(AlcoholScope),
      },
    },
    filtration: Boolean,
    pasteurization: Boolean,
    aged: {
      type: [agedSchema],
      default: undefined,
    },
    style: {
      type: [langValue],
      default: undefined,
    },
    isDryHopped: Boolean,
    dryHopped: {
      hops: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredients',
          },
        ],
        default: undefined,
      },
    },
  },
  { _id: false },
);

export default brewingSchema;
