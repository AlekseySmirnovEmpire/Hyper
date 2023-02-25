import {IEmailData} from "./email.data.interface";

export const EMAIL_SENDING_SERVICE = 'EMAIL_SENDING_SERVICE';

export interface IEmailSendingService {
    sendEmail: (emailData: IEmailData) => Promise<void>;
}