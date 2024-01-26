import { EncargoProps } from "../../domain/entity/encargos";
import { Request, Response } from "express";
import EncargoService from "../service/encargo.service";
import * as status from "../../constraints/http.stauts";

export default class EncargoController {
    constructor(private readonly EncargoService: EncargoService) {}

    async create(request: Request, response: Response) {
        const input = request.body as EncargoProps;
        const encargo = await this.EncargoService.create(input);
        return response.status(status.CREATED).json(encargo);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.EncargoService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }

    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as EncargoProps;

        const encargo = await this.EncargoService.update(+id, input);
        return response.json(encargo);
    }

    async getAll(request: Request, response: Response) {
        const encargos = await this.EncargoService.getAll();
        return response.json(encargos);
    }
}
