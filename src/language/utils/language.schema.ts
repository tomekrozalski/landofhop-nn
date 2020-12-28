import * as mongoose from 'mongoose';

import { langValue } from 'utils/schema';
import { getAllLanguagesQuery } from 'language/getAllLanguages';
import { getCodesQuery } from 'language/getCodes';

const languageSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: [langValue],
    required: true,
  },
});

languageSchema.index({ code: 1 }, { unique: true });
languageSchema.statics.getAllLanguages = getAllLanguagesQuery;
languageSchema.statics.getCodes = getCodesQuery;

export default languageSchema;
