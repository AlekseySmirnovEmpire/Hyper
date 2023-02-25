import {IEmailData} from "./email.data.interface";

export class SmtpEmailData implements IEmailData {
    constructor(public emailsTo: string[], public subject: string, public html: string) {}

}