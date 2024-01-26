import { ModeloContratoProps } from "../../domain/entity/modelo.contrato";
import ModeloContratoService from "../service/modelo.contrato.service";
import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";


export default class ModeloContratoController {
    constructor(private readonly modeloContratoService: ModeloContratoService) {}

    async create(request: Request, response: Response) {
        const input = request.body as ModeloContratoProps;
        const newModeloContrato = await this.modeloContratoService.create(input);
        return response.status(status.CREATED).json(newModeloContrato);
    }

    async update(request: Request, response: Response) {
        const input = request.body as ModeloContratoProps;
        const id = request.params.id;
        const newModeloContrato = await this.modeloContratoService.update(+id,input);
        return response.json(newModeloContrato);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.modeloContratoService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }

    async getAll(request: Request, response: Response) {
        const modelosContrato = await this.modeloContratoService.getAll();
        return response.json(modelosContrato);
    }
}
