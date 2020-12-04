import { Body, Controller, Post } from '@nestjs/common';

import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly userService: LoginService) {}

  @Post()
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const response: { token: string } = await this.userService.login({
      email,
      password,
    });

    return response;
  }
}
