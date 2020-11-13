import * as mongoose from 'mongoose';

import { langValue } from 'utils/schema';
import { taleSchema } from '../common';

const generalSchema = new mongoose.Schema(
  {
    series: {
      type: [langValue],
      default: undefined,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institution',
    },
    cooperation: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Institution',
        },
      ],
      default: undefined,
    },
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institution',
    },
    isContract: Boolean,
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
    },
    remark: {
      type: [langValue],
      default: undefined,
    },
    tale: {
      type: [taleSchema],
      default: undefined,
    },
  },
  { _id: false },
);

export default generalSchema;
