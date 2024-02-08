import { Request, Response } from "express";
import AfastamentoService from "../service/afastamento.service";
import { AfastamentoProps } from "../../domain/entity/afastamento";
import Joi from "joi";
import * as status from "../../constraints/http.stauts";


const schemaValidation = Joi.object({
  data_afastamento: Joi.date().required(),
  data_retorno: Joi.date().allow(null),
  motivo_afastamento: Joi.string().required(),
  funcionario_id: Joi.number().required(),
  tipo_afastamento_id: Joi.number().required(),
});


export default class AfastamentoController {
  constructor(private readonly afastamentoService: AfastamentoService) {}

  async create(request: Request, response: Response) {
    const input = request.body as AfastamentoProps;
    const { error } = schemaValidation.validate(input);

    if (error) {
      return response
        .status(status.UNPROCESSABLE_ENTITY)
        .json({ error: error.details[0].message });
    }

    const newAfastamento = await this.afastamentoService.create(input);
    return response.status(status.CREATED).json(newAfastamento);
  }

  async getByIdFuncionario(request: Request, response: Response) {
    const funcionario_id = request.params.funcionario_id;
    const afastamentos =
      await this.afastamentoService.getByIdFuncionario(+funcionario_id);
    return response.json(afastamentos);
  }

  async update(request: Request, response: Response) {
    const input = request.body as AfastamentoProps;
    const id = request.params.id;

    const updateAfastamento = await this.afastamentoService.update(+id, input);

    return response.json(updateAfastamento);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    await this.afastamentoService.delete(+id);
    return response.status(status.NO_CONTENT).json();
  }

  async getAll(request: Request, response: Response) {
    const afastamentos = await this.afastamentoService.getAll();
    return response.json(afastamentos);
  }

  async getById(
    request: Request,
    response: Response,
  ) {
    const id = request.params.id;
    const afastamento = await this.afastamentoService.getById(+id);
    return response.json(afastamento);
  }
}
