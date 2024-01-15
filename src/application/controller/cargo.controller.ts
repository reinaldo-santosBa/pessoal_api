import { Request, Response } from "express";
import CargosService from "../service/cargos.service";
import { CargoProps } from "../../domain/entity/cargo";

export default class CargoController {
    constructor(private readonly cargoService: CargosService) {}

    async create(request: Request, response: Response) {
        const input = request.body as CargoProps;

        await this.cargoService.create(input);

        return response.status(201);
    }

    async getAll(request: Request, response: Response) {
        const cargos = await this.cargoService.getAll();

        return response.json(cargos);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;

        await this.cargoService.delete(+id);
        return response.status(204);
    }
}
