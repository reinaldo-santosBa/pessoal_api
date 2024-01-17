import { AdvertenciaProps } from "../../domain/entity/advertencia";
import AdvertenciaService from "../service/advertencia.service";
import { Request, Response } from "express";

export default class AdvertenciaController {
    constructor(private readonly advertenciaService: AdvertenciaService) {}

    async create(request: Request, response: Response) {
        const input = request.body as AdvertenciaProps;
        const newAdvertencia = await this.advertenciaService.create(input);

        return response.status(201).json(newAdvertencia);
    }

    async getByIdFuncionario(request: Request, response: Response) {
        const funcionario_id = request.params.funcionario_id;
        const advertencias = await this.advertenciaService.getByIdFuncionario(+funcionario_id);
        return response.json(advertencias);
    }

    async update(request: Request, response: Response) {
        const input = request.body as AdvertenciaProps;
        const id = request.params.id;

        const updateAdvertencia = await this.advertenciaService.update(+id, input);
        return response.json(updateAdvertencia);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.advertenciaService.delete(+id);
        return response.status(204).json();
    }
}
