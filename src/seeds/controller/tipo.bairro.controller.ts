import { Request, Response } from "express";
import { TipoBairroService } from "../service/tipo.bairro.service";

export class TipoBairroController {
    async find(request: Request, response: Response) {
        const tipoBairroService =
        new TipoBairroService();

        const tipoBairro =
          await tipoBairroService.find();

        return response.json(tipoBairro);
    }
}
