import { Request, Response } from "express";
import CargosService, { CargoType } from "../service/cargos.service";
import { CargoProps } from "../../domain/entity/cargo";
import * as status from "../../constraints/http.stauts";

export default class CargoController {
  constructor(private readonly cargoService: CargosService) {}

  async create(request: Request, response: Response) {
    const input = request.body as CargoType;

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
