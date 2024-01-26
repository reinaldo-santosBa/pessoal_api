import { Request, Response } from "express";
import FuncionarioContratoService from "../service/funcionario.contrato.service";
import { FuncionarioContratoProps } from "../../domain/entity/funcionario.contrato";
import * as status from "../../constraints/http.stauts";

export default class FuncionarioContratoController {
    constructor(private readonly advertenciaService: FuncionarioContratoService) {}

    async create(request: Request, response: Response) {
        const input = request.body as FuncionarioContratoProps;
        const newContrato = await this.advertenciaService.create(input);

        return response.status(status.CREATED).json(newContrato);
    }

    async getByIdFuncionario(request: Request, response: Response) {
        const funcionario_id = request.params.funcionario_id;
        const contratos = await this.advertenciaService.getByIdFuncionario(+funcionario_id);
        return response.json(contratos);
    }

    async update(request: Request, response: Response) {
        const input = request.body as FuncionarioContratoProps;
        const id = request.params.id;

        const updateContrato = await this.advertenciaService.update(+id, input);
        return response.json(updateContrato);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.advertenciaService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }
}
