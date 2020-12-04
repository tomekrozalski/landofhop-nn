import * as mongoose from 'mongoose';

import { loginQuery } from 'user/login';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { strict: false },
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.statics.login = loginQuery;

export default userSchema;
