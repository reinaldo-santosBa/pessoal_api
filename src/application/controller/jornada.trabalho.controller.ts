import { Request, Response } from "express";
import { JornadaTrabalhoProps } from "../../domain/entity/jornada.trabalho";
import JornadaTrabalhoService from "../service/jornada.trabalho.service";
import Joi from "joi";
import * as status from "../../constraints/http.stauts";


const schemaValidation = Joi.object({
    jornada_trabalho: Joi.string().required(),
    carga_diaria: Joi.number().required(),
    unidade_tempo: Joi.string().valid("H", "M"),
    carga_semanal: Joi.number().required(),
    limite_extra_diario: Joi.number().required(),
    limite_extra_semanl: Joi.number().allow(null),
    limite_extra_mensal: Joi.number().allow(null),
});

export default class JornadaTrabalhoController {
    constructor(
    private readonly jornadaTrabalhoService: JornadaTrabalhoService,
    ) {}

    async insert(request: Request, response: Response) {

        const input = request.body as JornadaTrabalhoProps;

        const { error } = schemaValidation.validate(input);

        if (error) {
            return response.status(status.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
        }

        const jornada = await this.jornadaTrabalhoService.insert(input);
        return response.status(status.CREATED).json(jornada);
    }

    async getAll(request: Request, response: Response) {
        const jornadasTrabalho = await this.jornadaTrabalhoService.getAll();
        return response.json(jornadasTrabalho);
    }

    async update(request: Request, response: Response) {
        const input = request.body as JornadaTrabalhoProps;
        const id = request.params.id;

        const jornadaTrabalho = await this.jornadaTrabalhoService.update(
            +id,
            input,
        );
        return response.json(jornadaTrabalho);
    }

    async getById(request: Request, response: Response) {
        const id = request.params.id;
        const jornada_trabalho = await this.jornadaTrabalhoService.getById(+id);
        return response.json(jornada_trabalho);
    }
    async delete(request: Request, response: Response) {
        const id: string = request.params.id;
        await this.jornadaTrabalhoService.delete(+id);

        return response.status(status.NO_CONTENT).json({});
    }
}

