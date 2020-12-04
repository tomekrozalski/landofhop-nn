import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import UserSchema from 'user/user.schema';
import { LoginController, LoginService } from 'user/login';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class UserModule {}
