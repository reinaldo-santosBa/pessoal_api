import { EmailDto } from "../dto/email.dto";
import EmailService from "../service/email.service";
import { Request, Response } from "express";

export default class EmailController {
    async create(request: Request, response: Response) {
        const props = request.body as EmailDto[];
        const emailController = new EmailService();

        const emails = emailController.create(props);

        return response.status(201).json(emails);
    }
}
