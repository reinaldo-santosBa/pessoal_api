import { TelefoneProps } from "../../domain/entity/telefones";
import TelefoneService from "../service/telefone.service";
import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";
import Joi from "joi";

const schemaValidation = Joi.object({
  pessoa_id: Joi.number().required(),
  numero: Joi.string().required(),
  tipo_telefne_id: Joi.number().allow(null)
});
export default class TelefoneController {
  constructor(private readonly telefoneService: TelefoneService) {}

  async create(request: Request, response: Response) {
    const input = request.body as TelefoneProps;
    const { error } = schemaValidation.validate(input);

    if (error) {
      return response
        .status(status.UNPROCESSABLE_ENTITY)
        .json({ error: error.details[0].message });
    }

    const telefoneNew = await this.telefoneService.create(input);

    return response.status(status.CREATED).json(telefoneNew);
  }

  async getByIdPessoa(request: Request, response: Response) {
    const pessoa_id = request.params.pessoa_id;
    const telefones = await this.telefoneService.getByIdPessoa(+pessoa_id);
    return response.json(telefones);
  }

  async update(request: Request, response: Response) {
    const input = request.body as TelefoneProps;
    const id = request.params.id;

    const updateTelefone = await this.telefoneService.update(+id, input);

    return response.json(updateTelefone);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    await this.telefoneService.delete(+id);
    return response.status(status.NO_CONTENT).json();
  }
}

