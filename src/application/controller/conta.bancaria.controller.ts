import { Request, Response } from "express";
import ContaBancariaService from "../service/conta.bancaria.service";
import { ContaBancariaProps } from "../../domain/entity/conta.bancaria";

export default class ContaBancariaController {
    constructor(private readonly contaBancariaService: ContaBancariaService) {}

    async create(request: Request, response: Response) {
        const input = request.body as ContaBancariaProps;
        const contaBancaria = await this.contaBancariaService.create(input);
        return response.status(201).json(contaBancaria);
    }

    async getByIdPessoa(request: Request, response: Response) {
        const pessoa_id = request.params.pessoa_id;
        const contaBancaria = await this.contaBancariaService.getByIdPessoa(+pessoa_id);
        return response.json(contaBancaria);
    }

    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as ContaBancariaProps;

        const contaBancaria = await this.contaBancariaService.update(+id, input);

        return response.json(contaBancaria);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.contaBancariaService.delete(+id);
        return response.status(204).json();
    }
}
