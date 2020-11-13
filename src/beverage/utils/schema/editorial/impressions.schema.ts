import * as mongoose from 'mongoose';

import { Clarity } from 'beverage/utils/enums';

const impressionsSchema = new mongoose.Schema(
  {
    color: String,
    clarity: {
      type: String,
      enum: Object.values(Clarity),
    },
  },
  { _id: false },
);

export default impressionsSchema;
