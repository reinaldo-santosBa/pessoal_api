import { Request, Response } from "express";
import FuncionarioService, { IFuncionario } from "../service/funcionario.service";

export default class PessoaController {
    constructor(
    private readonly funcionarioService: FuncionarioService,
    ) {}

    async create(request: Request, response: Response) {
        const input = request.body as IFuncionario;

        await this.funcionarioService.create(input);

        return response.status(201).json({});
    }
}
