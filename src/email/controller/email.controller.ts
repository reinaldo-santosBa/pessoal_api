import { EmailDto } from "../dto/email.dto";
import EmailService from "../service/email.service";
import { Request, Response } from "express";

export default class EmailController {
    async create(request: Request, response: Response) {
        const { email, pessoa_id, tipo_email_id } = request.body as EmailDto;
        const emailController = new EmailService();

        const emails = emailController.create([{ email, pessoa_id, tipo_email_id }]);

        return response.status(201).json(emails);
    }
}
