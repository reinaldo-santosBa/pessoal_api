import { Request, Response } from "express";
import { CargoService } from "../services/cargo.service";
import { CargoDto } from "../dto/cargo.dto";

export class CargoController {
    cargoService = new CargoService();
    async create(request: Request, response: Response) {
        const {
            cargo,
            salario,
            comissao_direta,
            comissao_indireta,
        } = request.body as CargoDto;

        const cargo_result = await this.cargoService.create({
            cargo,
            salario,
            comissao_direta,
            comissao_indireta,
        });

        return response.status(201).json(cargo_result);
    }

    async find( _ : Request, response: Response) {
        const cargos = await this.cargoService.find();
        return response.json(cargos);
    }
}
