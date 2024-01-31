import { Request, Response } from "express";
import TipoAfastamentoService from "../service/tipo.afastamento.service";
import { TipoAfastamentoProps } from "../../domain/entity/tipo.afastamento";
import * as status from "../../constraints/http.stauts";


export default class TipoAfastamentoController {
    constructor(
    private readonly tipoAfastamentoService: TipoAfastamentoService,
    ) {}

    async create(request: Request, response: Response) {
        const input = request.body as TipoAfastamentoProps;
        const tipoAfastamento = await this.tipoAfastamentoService.create(input);
        return response.status(status.CREATED).json(tipoAfastamento);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.tipoAfastamentoService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }

    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as TipoAfastamentoProps;

        const tipoAfastamento = await this.tipoAfastamentoService.update(
            +id,
            input,
        );

        return response.json(tipoAfastamento);
    }

    async getAll(request: Request, response: Response) {
        const tipoAfastamento = await this.tipoAfastamentoService.getAll();
        return response.json(tipoAfastamento);
    }

    async getById(request: Request, response: Response) {
        const id = request.params.id;
        const tipoAfastamento = await this.tipoAfastamentoService.getById(+id);
        return response.json(tipoAfastamento);
    }
}
