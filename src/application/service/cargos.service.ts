import CargoEntity, { CargoProps } from "../../domain/entity/cargo";
import { CargoRepository } from "../../domain/repository/cargo.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
import { CargoAtividadesType } from "../../infrastructure/database/cargo.repository";

export type CargoType = {
    cargo: CargoProps;
    cargo_atividades: CargoAtividadesType[];
};

export default class CargosService {
  constructor(private readonly cargoRepository: CargoRepository) {}

  async create(input: CargoType): Promise<CargoEntity> {
    if (!input.cargo) {
      throw new AppError("Cargo é obrigatório", status.BAD_REQUEST);
    }

    const cargo = new CargoEntity(input.cargo);
    const output = await this.cargoRepository.insert({
      cargo,
      cargo_atividades: input.cargo_atividades,
    });

    return output;
  }

  async getAll(): Promise<CargoEntity[]> {
    try {
      const cargos = await this.cargoRepository.getAll();
      return cargos;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(id: number, input: CargoProps): Promise<CargoEntity> {
    if (!input.cargo) {
      throw new AppError("Cargo é obrigatório", status.BAD_REQUEST);
    }

    const cargoExisting = await this.cargoRepository.getByIdExisting(id);

    if (!cargoExisting) {
      throw new AppError("Cargo não encontrado", status.NOT_FOUND);
    }
    const cargo = new CargoEntity(input);

    const cargoUpdate = await this.cargoRepository.update(id, cargo);

    return cargoUpdate;
  }

  async getById(id: number): Promise<CargoType> {
    const cargo = await this.cargoRepository.getById(id);
    return cargo;
  }

  async delete(id: number) {
    const cargoExisting = await this.cargoRepository.getByIdExisting(id);

    if (!cargoExisting) {
      throw new AppError("Cargo não encontrado", status.NOT_FOUND);
    }

    await this.cargoRepository.delete(id);
  }
}
