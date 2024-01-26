import { ProvisaoProps } from "../../domain/entity/provisao";
import ProvisaoService from "../service/provisao.service";
import { Request, Response } from "express";


export default class ProvisaoController {
    constructor(private readonly provisaoService: ProvisaoService) {}

    async create(request: Request, response: Response) {
        const input = request.body as ProvisaoProps;
        const newProvisao = await this.provisaoService.create(input);

        return response.status(201).json(newProvisao);
    }

    async getAll(
        request: Request,
        response: Response,
    ) {
        const provisao = await this.provisaoService.getAll();
        return response.json(provisao);
    }

    async update(request: Request, response: Response) {
        const input = request.body as ProvisaoProps;
        const id = request.params.id;
        const provisao = await this.provisaoService.update(+id, input);
        return response.json(provisao);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.provisaoService.delete(+id);
        return response.status(204).json();
    }
}
