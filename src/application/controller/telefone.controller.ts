import { TelefoneProps } from "../../domain/entity/telefones";
import TelefoneService from "../service/telefone.service";
import { Request, Response } from "express";

export default class TelefoneController {
    constructor(private readonly telefoneService: TelefoneService) {}

    async create(request: Request, response: Response) {
        const input = request.body as TelefoneProps;
        const telefoneNew = await this.telefoneService.create(input);

        return response.status(201).json(telefoneNew);
    }

    async getByIdPessoa(request: Request, response: Response) {
        const pessoa_id = request.params.pessoa_id;
        const telefones = await this.telefoneService.getByIdPessoa(+pessoa_id);
        return response.json(telefones);
    }

    async update(request: Request, response: Response) {
        const input = request.body as TelefoneProps;
        const id = request.params.id;

        const updateTelefone = await this.telefoneService.update(+id, input);

        return response.json(updateTelefone);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.telefoneService.delete(+id);
        return response.status(204).json();
    }
}

