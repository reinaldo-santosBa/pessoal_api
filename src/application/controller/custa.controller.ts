import { Request, Response } from "express";
import CustaService from "../service/custa.service";
import { CustaProps } from "../../domain/entity/custa";
import Joi from "joi";
import * as status from "../../constraints/http.stauts";


const schemaValidation = Joi.object({
    funcionario_id: Joi.number().required(),
    responsavel_id: Joi.number().required(),
    produto_id: Joi.number().allow(null),
    servico_id: Joi.number().allow(null),
    data_custa: Joi.date().required(),
});


export default class CustaController {
    constructor(private readonly custaService: CustaService) {}

    async create(request: Request, response: Response) {
        const input = request.body as CustaProps;
        const { error } = schemaValidation.validate(input);

        if (error) {
            return response.status(status.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
        }

        const newCusta = await this.custaService.create(input);
        return response.status(status.CREATED).json(newCusta);
    }

    async getAllFuncionarioId(request: Request, response: Response) {
        const funcionario_id = request.params.funcionario_id;
        const custa = await this.custaService.getAllFuncionarioId(+funcionario_id);
        return response.json(custa);
    }

    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as CustaProps;

        const updateCusta = await this.custaService.update(+id, input);
        return response.json(updateCusta);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.custaService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }
}
