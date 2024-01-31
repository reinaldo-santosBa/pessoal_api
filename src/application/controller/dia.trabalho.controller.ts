import { Request, Response } from "express";
import DiaJornadaTrabalhoService from "../service/dia.jornada.trabalho.service";
import { DiaJornadaTrabalhoProps } from "../../domain/entity/dia.jornada.trabalho";
import * as status from "../../constraints/http.stauts";


export default class DiaTrabalhoController {
    constructor(private readonly diaTrabalhoService: DiaJornadaTrabalhoService) {}

    async create(request: Request, response: Response) {
        const input = request.body as DiaJornadaTrabalhoProps;
        const diaTrabalho = await this.diaTrabalhoService.create(input);
        return response.status(status.CREATED).json(diaTrabalho);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.diaTrabalhoService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }

    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as DiaJornadaTrabalhoProps;

        const diaTrabalho = await this.diaTrabalhoService.update(+id, input);
        return response.json(diaTrabalho);
    }

    async getById(request: Request, response: Response) {
        const id = request.params.id;
        const diaTrabalho = await this.diaTrabalhoService.getById(+id);
        return response.json(diaTrabalho);
    }

    async getAll(request: Request, response: Response) {
        const diaTrabalho = await this.diaTrabalhoService.getAll();
        return response.json(diaTrabalho);
    }
}
