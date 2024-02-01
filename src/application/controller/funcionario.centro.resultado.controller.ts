import FuncionarioCentroResultadoService from "../service/funcionario.centro.resultado.service";
import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";
import { FuncionarioCentroResultadoProps } from "../../domain/entity/funcionario.centro.resultado";

export default class FuncionarioCentroResultadoController {
    constructor(
    private readonly funcionarioCentroResultadoService: FuncionarioCentroResultadoService,
    ) {}

    async create(request: Request, response: Response) {
        const input = request.body as FuncionarioCentroResultadoProps;
        const newfuncionarioCentroResult = await this.funcionarioCentroResultadoService.create(input);
        return response.status(status.CREATED).json(newfuncionarioCentroResult);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.funcionarioCentroResultadoService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }

    async getAllByFuncionarioId(request: Request, response: Response) {
        const funcionario_id = request.params.funcionario_id;
        const funcionarioCentroResult =
      await this.funcionarioCentroResultadoService.getAllByFuncionarioId(+funcionario_id);
        return response.json(funcionarioCentroResult);
    }

    async getAllByCentroResultadoId(request: Request, response: Response) {
        const centro_resultado_id = request.params.centro_resultado_id;
        const funcionarioCentroResult = await this.funcionarioCentroResultadoService.getAllByCentroResultadoId(+centro_resultado_id);
        return response.json(funcionarioCentroResult);
    }
}
