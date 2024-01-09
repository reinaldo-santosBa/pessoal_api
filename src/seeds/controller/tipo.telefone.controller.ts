import { Request, Response } from "express";
import { TipoTelefoneService } from "../service/tipo.telefone.service";

export class TipoTelefoneController {
    async find(request: Request, response: Response) {
        const tipoTelefoneService = new TipoTelefoneService();

        const tipoTelefone = await tipoTelefoneService.find();

        return response.json(tipoTelefone);
    }
}
