import { DescontoProps } from "../../domain/entity/desconto";
import DescontoService from "../service/desconto.service";
import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";


export default class DescontoController {
    constructor(private readonly descontoService: DescontoService) {}

    async create(request: Request, response: Response) {
        const desconto = request.body as DescontoProps;

        const newDesconto = await this.descontoService.create(desconto);
        return response.status(status.CREATED).json(newDesconto);
    }

    async getAll(request: Request, response: Response) {
        const desconto = await this.descontoService.getAll();
        return response.json(desconto);
    }

    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as DescontoProps;

        const updateDesconto = await this.descontoService.update(+id, input);
        return response.json(updateDesconto);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.descontoService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }
}
