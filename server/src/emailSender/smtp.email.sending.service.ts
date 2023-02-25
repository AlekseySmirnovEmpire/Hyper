import {IEmailSendingService} from "./email.sending.service.interface";
import * as nodemailer from 'nodemailer';
import * as process from "process";
import {IEmailData} from "./email.data.interface";
import {BadRequestException} from "@nestjs/common";

export class SmtpEmailSendingService implements IEmailSendingService {
    private static instance: SmtpEmailSendingService;
    private readonly transporter: nodemailer.Transporter;

    private constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    static getInstance(): SmtpEmailSendingService {
        if (!SmtpEmailSendingService.instance) {
            SmtpEmailSendingService.instance = new SmtpEmailSendingService();
        }

        return SmtpEmailSendingService.instance;
    }

    async verifyConnection() {
        return this.transporter.verify();
    }

    getTransporter(): nodemailer.Transporter {
        return this.transporter;
    }

    async sendEmail(emailData: IEmailData): Promise<void> {
        try {
            for(let emailTo of emailData.emailsTo) {
                await this.transporter.sendMail({
                    from: process.env.SMTP_USER,
                    to: emailTo,
                    subject: emailData.subject,
                    text: '',
                    html: emailData.html
                });
            }
        } catch (ex) {
            throw new BadRequestException(ex);
        }
    }

}