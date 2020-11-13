import * as mongoose from 'mongoose';
import * as Int32 from 'mongoose-int32';

import { TemperatureUnit } from 'beverage/utils/enums';

const impressionsSchema = new mongoose.Schema(
  {
    bitterness: {
      type: Int32,
      min: 0,
      max: 100,
    },
    sweetness: {
      type: Int32,
      min: 0,
      max: 100,
    },
    fullness: {
      type: Int32,
      min: 0,
      max: 100,
    },
    power: {
      type: Int32,
      min: 0,
      max: 100,
    },
    hoppyness: {
      type: Int32,
      min: 0,
      max: 100,
    },
    temperature: {
      from: {
        type: Int32,
        min: 0,
        max: 100,
      },
      to: {
        type: Int32,
        min: 0,
        max: 100,
      },
      unit: {
        type: String,
        enum: Object.values(TemperatureUnit),
      },
    },
  },
  { _id: false },
);

export default impressionsSchema;
