import { Request, Response } from "express";
import { NacionalidadeService } from "../service/nacionalidade.service";


export class NacionalidadeController {
    async find(request: Request, response: Response) {
        const nacionalidadeService = new NacionalidadeService();

        const nacionalidades = await nacionalidadeService.find();

        return response.json(nacionalidades);
    }
}
