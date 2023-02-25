import {Inject, Injectable} from '@nestjs/common';
import {IUserService} from "./user.service.interface";
import {RegisterDto} from "./dto/register.dto";
import {UserEntity} from "./user.entity";
import {LoginDto} from "./dto/login.dto";
import {Role} from "./role.enum";
import {IUserRepository, USER_REPOSITORY} from "./user.repository.interface";
import {UserModel} from "@prisma/client";
import * as process from "process";
import {IEmailSendingService} from "../emailSender/email.sending.service.interface";
import {SmtpEmailSendingService} from "../emailSender/smtp.email.sending.service";
import {SmtpEmailData} from "../emailSender/smtp.email.data";

@Injectable()
export class UsersService implements IUserService{

    private readonly emailService: IEmailSendingService;
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {
        this.emailService = SmtpEmailSendingService.getInstance();
    }
    async createUser({email, firstName, lastName, nickName, password}: RegisterDto): Promise<UserModel | null> {
        const newUser = new UserEntity(email, firstName, lastName, nickName, Role.User, parseInt(process.env.DEFAULT_RATING));
        await newUser.setPassword(password);
        const existedUser = await this.userRepository.find(email);
        if (existedUser) {
            return null;
        }

        const user =  await this.userRepository.create(newUser);

        await this.emailService.sendEmail(new SmtpEmailData(
            [email],
            'Подтверждение регистрации',
            `<div style="background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 48%, rgba(88,88,88,1) 100%);">
                        <div class="row justify-content-center">
                            <div class="col-sm-12">
                                <img src="${process.env.LOGO_URL}" /> 
                                <span style="font-size: 25px; color: white; text-align: center;">Hyper</span>
                                <h1 style="color: white; text-align: center">Подтвердите регистрацию</h1>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-sm-12" style="color: white; text-align: center">
                                Вы отправили запрос на регистрацию на сайте Hyper. Чтобы подтвердить регистрацию пройдите по ссылке: 
                                <br />
                                <br />
                                <button style="background-color: #41464b; height: 50px; border-radius: 15px; cursor: pointer;"> 
                                    <a style="cursor: pointer; color: #ffc107;" target="_blank" href="${process.env.CLIENT_URL}/confirm/${user.id}">
                                        Подтверждение регистрации
                                    </a> 
                                </button>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-sm-12" style="color: white; text-align: center">
                                Если вы не совершали такого действия, то просто проигнорируйте это сообщение!
                            </div>
                        </div>
                    </div>`));

        return user;
    }

}
