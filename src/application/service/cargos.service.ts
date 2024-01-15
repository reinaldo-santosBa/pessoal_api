import CargoEntity, { CargoProps } from "../../domain/entity/cargo";
import { CargoRepository } from "../../domain/repository/cargo.repository";

export default class CargosService {
    constructor(private readonly cargoRepository: CargoRepository) { }

    async create(input: CargoProps) {
        const cargo = new CargoEntity(input);

        await this.cargoRepository.insert(cargo);
    }

    async getAll() {
        const cargos = await this.cargoRepository.getAll();
        return cargos;
    }

    async update(id: number, input: CargoProps) {

    }

    async delete(id: number) {
        await this.cargoRepository.delete(id);
    }

}
