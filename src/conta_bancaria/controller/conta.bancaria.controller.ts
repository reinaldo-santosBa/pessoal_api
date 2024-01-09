import { Request, Response } from "express";
import contaBancariaDto from "../dto/conta.bancaria.dto";
import ContaBancariaService from "../service/conta.bancaria.service";

export default class ContaBancariaController {
    async create(request: Request, response: Response) {
        const { conta, agencia_id, digito, operacao, pessoa_id, tipo_conta_id } = request.body as contaBancariaDto;

        const contaBancariaService = new ContaBancariaService();

        const conta_result = await contaBancariaService.create({
            conta,
            agencia_id,
            digito,
            operacao,
            pessoa_id,
            tipo_conta_id
        });

        return response.status(201).json(conta_result);
    }
}
