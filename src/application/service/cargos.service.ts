import CargoEntity, { CargoProps } from "../../domain/entity/cargo";
import { CargoRepository } from "../../domain/repository/cargo.repository";
import AppError from "../errors/AppError";

export default class CargosService {
    constructor(private readonly cargoRepository: CargoRepository) {}

    async create(input: CargoProps): Promise<CargoEntity> {

        if (!input.cargo) {
            throw new AppError("Cargo é obrigatório",400);
        }

        const cargo = new CargoEntity(input);
        const output = await this.cargoRepository.insert(cargo);

        return output;
    }

    async getAll(): Promise<CargoEntity[]> {
        try {
            const cargos = await this.cargoRepository.getAll();
            return cargos;
        } catch (error) {
            throw new AppError(error.message,500);
        }
    }

    async update(id: number, input: CargoProps): Promise<CargoEntity> {
        if (!input.cargo) {
            throw new AppError("Cargo é obrigatório",400);
        }

        const cargoExisting = await this.cargoRepository.getById(id);

        if (!cargoExisting) {
            throw new AppError("Cargo não encontrado", 404);
        }
        const cargo = new CargoEntity(input);

        const cargoUpdate = await this.cargoRepository.update(id, cargo);

        return cargoUpdate;
    }

    async delete(id: number) {
        const cargoExisting = await this.cargoRepository.getById(id);

        if (!cargoExisting) {
            throw new AppError("Cargo não encontrado", 404);
        }

        await this.cargoRepository.delete(id);
    }
}
