import * as mongoose from 'mongoose';
import * as Int32 from 'mongoose-int32';

const coverImageSchema = new mongoose.Schema(
  {
    height: Int32,
    width: Int32,
  },
  { _id: false },
);

const outlinesSchema = new mongoose.Schema(
  {
    cover: String,
    gallery: String,
  },
  { _id: false },
);

const photosSchema = new mongoose.Schema(
  {
    cap: {
      type: Boolean,
      validate: {
        validator(v) {
          return v;
        },
        message: props => `${props.value} need to be true or be undefined`,
      },
    },
    cover: coverImageSchema,
    gallery: Int32,
    outlines: outlinesSchema,
  },
  { _id: false },
);

export default photosSchema;
