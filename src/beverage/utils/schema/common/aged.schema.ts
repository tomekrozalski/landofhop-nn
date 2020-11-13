import * as mongoose from 'mongoose';
import * as Int32 from 'mongoose-int32';

import {
  AgedPreviousContent,
  AgedTimeUnit,
  AgedType,
  AgedWood,
} from 'beverage/utils/enums';

const agedSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(AgedType),
    },
    wood: {
      type: String,
      enum: Object.values(AgedWood),
    },
    time: {
      value: {
        type: Int32,
        min: 0,
        max: 10000,
      },
      unit: {
        type: String,
        enum: Object.values(AgedTimeUnit),
      },
    },
    previousContent: {
      type: [
        {
          type: String,
          enum: Object.values(AgedPreviousContent),
        },
      ],
      default: undefined,
    },
  },
  { _id: false },
);

export default agedSchema;
