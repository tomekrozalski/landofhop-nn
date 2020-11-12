import * as mongoose from 'mongoose';

export default new mongoose.Schema(
  {
    language: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);
