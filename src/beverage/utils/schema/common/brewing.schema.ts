import * as mongoose from 'mongoose';
import * as Int32 from 'mongoose-int32';

import { langValue } from 'utils/schema';
import {
  AlcoholRelate,
  AlcoholScope,
  AlcoholUnit,
  Category,
  ExpirationDateUnit,
  ExtractRelate,
  ExtractUnit,
  Fermentation,
  HopRateUnit,
} from 'beverage/utils/enums';
import agedSchema from './aged.schema';

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
    extract: {
      relate: {
        type: String,
        enum: Object.values(ExtractRelate),
        required() {
          return this.extract.unit || this.extract.value;
        },
      },
      unit: {
        type: String,
        enum: Object.values(ExtractUnit),
        required() {
          return this.extract.relate || this.extract.value;
        },
      },
      value: {
        type: mongoose.Schema.Types.Decimal128,
        min: 0,
        max: 100,
        required() {
          return this.extract.relate || this.extract.unit;
        },
      },
    },
    alcohol: {
      relate: {
        type: String,
        enum: Object.values(AlcoholRelate),
        required() {
          return this.alcohol.unit || this.alcohol.value;
        },
      },
      unit: {
        type: String,
        enum: Object.values(AlcoholUnit),
        required() {
          return this.alcohol.relate || this.alcohol.value;
        },
      },
      value: {
        type: mongoose.Schema.Types.Decimal128,
        min: 0,
        max: 100,
        required() {
          return this.alcohol.relate || this.alcohol.unit;
        },
      },
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
    hopRate: {
      value: {
        type: mongoose.Schema.Types.Decimal128,
        min: 0,
        max: 10000,
        required() {
          return this.hopRate.unit;
        },
      },
      unit: {
        type: String,
        enum: Object.values(HopRateUnit),
        required() {
          return this.hopRate.value;
        },
      },
    },
    expirationDate: {
      value: {
        type: Int32,
        min: 0,
        max: 10000,
        required() {
          return this.expirationDate.unit;
        },
      },
      unit: {
        type: String,
        enum: Object.values(ExpirationDateUnit),
        required() {
          return this.expirationDate.value;
        },
      },
    },
  },
  { _id: false },
);

export default brewingSchema;
