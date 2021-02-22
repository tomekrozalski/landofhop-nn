import * as mongoose from 'mongoose';

const taleSchema = new mongoose.Schema(
  {
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language',
      required: false,
    },
    lead: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: false,
    },
  },
  { _id: false },
);

export default taleSchema;
