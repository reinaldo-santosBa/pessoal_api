import { Request, Response } from "express";
import AgenciaDto from "../dto/agencia.dto";
import AgenciaService from "../service/agencia.service";

export default class AgenciaController {
    async create(request: Request, response: Response) {
        const { banco_id,digito, numero} = request.body as AgenciaDto;

        const agenciaService = new AgenciaService();

        const agencia = await agenciaService.create({
            banco_id,
            digito,
            numero
        });

        return response.status(201).json(agencia);

    }
}
