import { Request, Response } from "express";
import DiaJornadaTrabalhoService from "../service/dia.jornada.trabalho.service";
import { DiaJornadaTrabalhoProps } from "../../domain/entity/dia.jornada.trabalho";

export default class DiaTrabalhoController {
    constructor(private readonly diaTrabalhoService: DiaJornadaTrabalhoService) {}

    async create(request: Request, response: Response) {
        const input = request.body as DiaJornadaTrabalhoProps;
        const diaTrabalho = await this.diaTrabalhoService.create(input);
        return response.json(diaTrabalho);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.diaTrabalhoService.delete(+id);
        return response.status(204).json();
    }

    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as DiaJornadaTrabalhoProps;

        const diaTrabalho = await this.diaTrabalhoService.update(+id, input);
        return response.json(diaTrabalho);
    }

    async getAll(request: Request, response: Response) {
        const diaTrabalho = await this.diaTrabalhoService.getAll();
        return response.json(diaTrabalho);
    }
}
