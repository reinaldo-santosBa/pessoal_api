import { Request, Response } from "express";
import AtividadeService from "../service/atividade.service";

export default class AtividadeController {
    constructor(private readonly atividadeService: AtividadeService) {}

    async create(request: Request, response: Response) {
        await this.atividadeService.create();
    }

    async getAll(request: Request, response: Response) {
        const atividades = await this.atividadeService.getAll();
        return response.json(atividades);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.atividadeService.delete(+id);

        return response.status(204);
    }
}
