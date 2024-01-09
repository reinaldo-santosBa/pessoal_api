import { Request, Response } from "express";
import { TipoLogradouroService } from "../service/tipo.logradouro.service";

export class TipoLogradouroController {
    async find(request: Request, response: Response) {
        const tipoLogradouroService = new TipoLogradouroService();

        const tipoLogradouro =
         await tipoLogradouroService.find();

        return response.json(tipoLogradouro);
    }
}
