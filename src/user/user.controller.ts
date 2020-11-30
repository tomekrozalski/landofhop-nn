import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async logIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const response: { token: string } = await this.UserService.logIn({
      email,
      password,
    });

    return response;
  }
}
