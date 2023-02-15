import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Inject,
    Post,
    Delete
} from '@nestjs/common';
import {IUserService, USER_SERVICE} from "./users/user.service.interface";
import {RegisterDto} from "./users/dto/register.dto";
import {AuthService} from "./auth/auth.service";
import {LoginDto} from "./users/dto/login.dto";
import {RefreshTokenDto} from "./refreshToken/dto/refresh-token.dto";

@Controller('auth')
export class AppController {
    constructor(
        @Inject(USER_SERVICE) private readonly userService: IUserService,
        private readonly authService: AuthService) {
    }

    @Post('login')
    async login(@Body() dto: LoginDto): Promise<{accessToken: string, refreshToken: string}> {
        return await this.authService.login(dto);
    }

    @Post('refresh')
    async refresh(@Body() token: RefreshTokenDto): Promise<{accessToken: string}> {
        return this.authService.refresh(token.refreshToken);
    }

    @Delete('logout')
    async logout(@Body() token: RefreshTokenDto): Promise<void> {
        return this.authService.logout(token.refreshToken);
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
