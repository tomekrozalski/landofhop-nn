import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'user/types';

@Injectable()
export class LoginService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async login({ email, password }: User) {
    const {
      status,
      message,
      token,
    }: {
      status: number;
      message: string;
      token?: string;
    } = await this.userModel.login({ email, password });

    switch (status) {
      case 200:
        return { token };
      case 400:
        throw new BadRequestException(message);
      case 404:
        throw new NotFoundException(message);
      case 500:
        throw new InternalServerErrorException(message);
    }
  }
}
