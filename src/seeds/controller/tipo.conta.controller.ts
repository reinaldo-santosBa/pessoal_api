import { Request, Response } from "express";
import { TipoContaService } from "../service/tipo.conta.service";

export class TipoContaController {
    async find(_: Request, response: Response) {
        const tipoContaService = new TipoContaService();

        const tipoConta = await tipoContaService.find();

        return response.json(tipoConta);
    }
}
