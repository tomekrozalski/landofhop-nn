import * as mongoose from 'mongoose';

import { langValue } from 'utils/schema';
import { taleSchema } from '../common';

const generalSchema = new mongoose.Schema(
  {
    name: {
      type: [langValue],
      validate: {
        validator(v) {
          return v.length;
        },
        message: props => `${props.value} is empty`,
      },
      required: true,
    },
    series: {
      type: [langValue],
      default: undefined,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institution',
      required: true,
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
      validate: {
        validator(v) {
          return !v.find(({ lead }) => lead.length < 5);
        },
        message: props => `${props.lead} has less then 4 signs`,
      },
      default: undefined,
    },
    barcode: String,
  },
  { _id: false },
);

export default generalSchema;
