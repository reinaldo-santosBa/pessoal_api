import { Request, Response } from "express";
import { TipoEmailService } from "../service/tipo.email.service";

export class TipoEmailController {
    async find(request: Request, response: Response) {
        const tipoEmailService = new TipoEmailService();

        const tipoEmail = await tipoEmailService.find();

        return response.json(tipoEmail);
    }
}
