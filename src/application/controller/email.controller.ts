import { Request, Response } from "express";
import EmailService from "../service/email.service";
import { EmailProps } from "../../domain/entity/email";

export default class EmailController {

    constructor(private readonly emailService: EmailService){}

    async create(request: Request, response: Response) {
        const input = request.body as EmailProps;
        await this.emailService.create(input);
        return response.status(201);
    }

    async getByIdPessoa(request: Request, response: Response) {
        const id = request.params.id;
        const emailsPessoa = await this.emailService.getByIdPessoa(+id);
        return response.json(emailsPessoa);
    }

    async delete(request: Request, response: Response) {
        const pessoa_id = request.params.pessoa_id;
        await this.emailService.delete(+pessoa_id);
        return response.status(204);
    }
}
