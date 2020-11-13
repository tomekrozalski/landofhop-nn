import * as mongoose from 'mongoose';
import * as Int32 from 'mongoose-int32';

import {
  ContainerColor,
  ContainerMaterial,
  ContainerType,
  ContainerUnit,
} from 'beverage/utils/enums';

const containerSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      enum: Object.values(ContainerColor),
    },
    material: {
      type: String,
      enum: Object.values(ContainerMaterial),
    },
    unit: {
      type: String,
      enum: Object.values(ContainerUnit),
    },
    type: {
      type: String,
      enum: Object.values(ContainerType),
    },
    value: {
      type: Int32,
      min: 0,
      max: 100000,
    },
    hasCork: {
      type: Boolean,
      validate: {
        validator(v) {
          return v;
        },
        message: props => `${props.value} need to be true or be undefined`,
      },
    },
    hasCapWireFlip: {
      type: Boolean,
      validate: {
        validator(v) {
          return v;
        },
        message: props => `${props.value} need to be true or be undefined`,
      },
    },
  },
  { _id: false },
);

export default containerSchema;
