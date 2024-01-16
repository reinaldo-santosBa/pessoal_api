import { Request, Response } from "express";
import CargosService from "../service/cargos.service";
import { CargoProps } from "../../domain/entity/cargo";

export default class CargoController {
    constructor(private readonly cargoService: CargosService) {}

    async create(request: Request, response: Response) {
        const input = request.body as CargoProps;

        const cargo =  await this.cargoService.create(input);

        return response.status(201).json(cargo);
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

    async delete(request: Request, response: Response) {
        const id = request.params.id;

        await this.cargoService.delete(+id);
        return response.status(204).json();
    }
}
