import { ConvenioProps } from "../../domain/entity/convenio";
import ConvenioService from "../service/convenio.service";
import { Request, Response } from "express";


export default class ConvenioController {
    constructor(private readonly convenioService: ConvenioService) {}

    async create(request: Request, response: Response) {
        const input = request.body as ConvenioProps;
        const convenio = await this.convenioService.create(input);
        return response.json(convenio);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.convenioService.delete(+id);
        return response.status(204).json();
    }

    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as ConvenioProps;

        const convenio = await this.convenioService.update(+id, input);
        return response.json(convenio);
    }

    async getAll(request: Request, response: Response) {
        const convenios = await this.convenioService.getAll();
        return response.json(convenios);
    }
}
