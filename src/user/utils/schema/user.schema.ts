import * as mongoose from 'mongoose';

import logIn from 'user/login.query';

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
userSchema.statics.logIn = logIn;

export default userSchema;
