import { Request, Response } from "express";
import CargosService from "../service/cargos.service";
import { CargoProps } from "../../domain/entity/cargo";
import * as status from "../../constraints/http.stauts";
import Joi from "joi";

const schemaValidation = Joi.object({
  cargo: Joi.string().required(),
  remuneracao: Joi.number().allow(null),
  comissao_direta: Joi.number().allow(null),
  comissao_indireta: Joi.number().allow(null),
  jornada_trabalho_id: Joi.number().allow(null),
});

export default class CargoController {
  constructor(private readonly cargoService: CargosService) {}

  async create(request: Request, response: Response) {
    const input = request.body as CargoProps;
    const { error } = schemaValidation.validate(input);

    if (error) {
      return response
        .status(status.UNPROCESSABLE_ENTITY)
        .json({ error: error.details[0].message });
    }

    const cargo = await this.cargoService.create(input);

    return response.status(status.CREATED).json(cargo);
  }

  async getAll(request: Request, response: Response) {
    const cargos = await this.cargoService.getAll();

    return response.json(cargos);
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;
    const input = request.body as CargoProps;

    const cargo = await this.cargoService.update(+id, input);
    return response.json(cargo);
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;
    const cargo = await this.cargoService.getById(+id);
    return response.json(cargo);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;

    await this.cargoService.delete(+id);
    return response.status(status.NO_CONTENT).json();
  }
}
