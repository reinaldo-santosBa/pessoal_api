import { JornadaTrabalhoProps } from "../../domain/entity/jornada.trabalho";
import AppError from "../errors/AppError";
import JornadaTrabalhoService from "../service/jornada.trabalho.service";
import { Request, Response } from "express";


export default class JornadaTrabalhoController {
    constructor(
    private readonly jornadaTrabalhoService: JornadaTrabalhoService,
    ) {}

    async insert(request: Request, response: Response) {
        try {
            const input = request.body as JornadaTrabalhoProps;

            const camposObrigatorios: string[] = [
                "jornada_trabalho",
                "carga_diaria",
                "carga_semanal",
                "limite_extra_diario",
            ];

            for (const campo of camposObrigatorios) {
                if (!input[campo]) {
                    throw new AppError(`${campo} obrigatório`, 400);
                }
            }

            const jornada = await this.jornadaTrabalhoService.insert(input);
            return response.status(201).json(jornada);
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async getAll(request: Request, response: Response) {
        const jornadasTrabalho = await this.jornadaTrabalhoService.getAll();
        return response.json(jornadasTrabalho);
    }

    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as JornadaTrabalhoProps;

        const jornadaTrabalho = await this.jornadaTrabalhoService.update(+id, input);
        return response.json(jornadaTrabalho);
    }

    async delete(request: Request, response: Response) {
        const id: string = request.params.id;
        await this.jornadaTrabalhoService.delete(+id);

        return response.status(204).json({});
    }
}

