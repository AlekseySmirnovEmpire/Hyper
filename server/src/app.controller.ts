import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Inject,
    Post,
    Delete,
    Response,
    Get,
    Request, BadRequestException, Param
} from '@nestjs/common';
import {IUserService, USER_SERVICE} from "./users/user.service.interface";
import {RegisterDto} from "./users/dto/register.dto";
import {AuthService} from "./auth/auth.service";
import {LoginDto} from "./users/dto/login.dto";
import {UserModel} from "@prisma/client";

@Controller('auth')
export class AppController {
    constructor(
        @Inject(USER_SERVICE) private readonly userService: IUserService,
        private readonly authService: AuthService) {
    }

    @Post('confirm/:id')
    async confirmEmail(@Param('id') id: string): Promise<void> {
        await this.authService.confirmUser(id);
    }

    @Post('login')
    async login(@Response() res, @Body() dto: LoginDto): Promise<{accessToken: string, user: UserModel}> {
        const tokens = await this.authService.login(dto);
        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.send({
            accessToken: tokens.accessToken,
            user: tokens.user
        });
    }

    @Get('refresh')
    async refresh(@Request() req): Promise<{accessToken: string, user: UserModel}> {
        try {
            return this.authService.refresh(req.cookies['refreshToken']);
        } catch (ex) {
            throw new BadRequestException(ex);
        }
    }

    @Delete('logout')
    async logout(@Response() res, @Request() req): Promise<void> {
        await this.authService.logout(req.cookies['refreshToken']);
        res.clearCookie('refreshToken');

        return res.send();
    }

    @Post('register')
    async register(@Body() dto: RegisterDto): Promise<{user: UserModel}> {
        const result = await this.userService.createUser(dto);
        if (!result) {
            throw new HttpException('Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return {
            user: result
        };
    }
}
