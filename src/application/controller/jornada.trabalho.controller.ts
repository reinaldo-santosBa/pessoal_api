import { Request, Response } from "express";
import { JornadaTrabalhoProps } from "../../domain/entity/jornada.trabalho";
import JornadaTrabalhoService from "../service/jornada.trabalho.service";


export default class JornadaTrabalhoController {
    constructor(
    private readonly jornadaTrabalhoService: JornadaTrabalhoService,
    ) {}

    async insert(request: Request, response: Response) {

        const input = request.body as JornadaTrabalhoProps;

        const jornada = await this.jornadaTrabalhoService.insert(input);
        return response.status(201).json(jornada);
    }

    async getAll(request: Request, response: Response) {
        const jornadasTrabalho = await this.jornadaTrabalhoService.getAll();
        return response.json(jornadasTrabalho);
    }

    async update(request: Request, response: Response) {
        const input = request.body as JornadaTrabalhoProps;
        const id = request.params.id;

        const jornadaTrabalho = await this.jornadaTrabalhoService.update(
            +id,
            input,
        );
        return response.json(jornadaTrabalho);
    }

    async delete(request: Request, response: Response) {
        const id: string = request.params.id;
        await this.jornadaTrabalhoService.delete(+id);

        return response.status(204).json({});
    }
}

