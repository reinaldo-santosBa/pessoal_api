import { CargoType } from "../../application/service/cargos.service";
import { CargoTypeInput } from "../../infrastructure/database/cargo.repository";
import CargoEntity from "../entity/cargo";

export interface CargoRepository {
    insert(input: CargoTypeInput): Promise<CargoEntity>;
    getAll(): Promise<CargoEntity[]>;
    update(id: number, input: CargoEntity): Promise<CargoEntity>;
    delete(id: number): Promise<void>;
    getByIdExisting(id: number): Promise<number>;
    getById(id: number): Promise<CargoType>;
}
