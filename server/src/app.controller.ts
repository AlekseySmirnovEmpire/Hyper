import {Body, Controller, Request, Get, HttpException, HttpStatus, Inject, Post, UseGuards} from '@nestjs/common';
import {IUserService, USER_SERVICE} from "./users/user.service.interface";
import {RegisterDto} from "./users/dto/register.dto";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {LocalAuthGuard} from "./auth/local-auth.guard";

@Controller('auth')
export class AppController {
  constructor(
      @Inject(USER_SERVICE) private readonly userService: IUserService,
      private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req): Promise<void> {
    return req.user;
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const result = await this.userService.createUser(dto);
    if (!result) {
      throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return {
      email: result.email
    };
  }
}
