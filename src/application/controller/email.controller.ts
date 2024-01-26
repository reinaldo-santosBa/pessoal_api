import { Request, Response } from "express";
import EmailService from "../service/email.service";
import { EmailProps } from "../../domain/entity/email";
import * as status from "../../constraints/http.stauts";

export default class EmailController {
    constructor(private readonly emailService: EmailService) {}

    async create(request: Request, response: Response) {
        const input = request.body as EmailProps;
        const email = await this.emailService.create(input);
        return response.status(status.CREATED).json(email);
    }

    async getByIdPessoa(request: Request, response: Response) {
        const pessoa_id = request.params.pessoa_id;
        const emailsPessoa = await this.emailService.getByIdPessoa(+pessoa_id);
        return response.json(emailsPessoa);
    }

    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as EmailProps;

        const email = await this.emailService.update(+id, input);

        return response.json(email);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.emailService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }
}
