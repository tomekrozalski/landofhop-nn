import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from 'user/utils/User';

const logIn = function({
  email,
  password,
}: User): {
  status: number;
  message: string;
  token?: string;
} {
  return this.findOne({ email })
    .exec()
    .then(user => {
      if (!user) {
        return {
          status: 404,
          message: `User with the email address: ${email} not found`,
        };
      }

      return bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (!doMatch) {
            return {
              status: 400,
              message: 'Authentication failed, invalid password',
            };
          }

          const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
            expiresIn: '12h',
          });

          return {
            status: 200,
            message: 'Authentication succeeded',
            token,
          };
        })
        .catch(() => {
          return {
            status: 500,
            message: 'Decryption failed',
          };
        });
    });
};

export default logIn;
