import { CargoType } from "../../application/service/cargos.service";
import { CargoTypeInput } from "../../infrastructure/database/cargo.repository";
import CargoEntity from "../entity/cargo";

export interface AllCargo {
    id: string;
    cargo: string;
    remuneracao: string;
    comissao_direta: string;
    comissao_indireta: string;
    jornada_trabalho_id: string;
    jornada_trabalho: string;
}

export interface CargoRepository {
    insert(input: CargoTypeInput): Promise<CargoEntity>;
    getAll(): Promise<AllCargo[]>;
    update(id: number, input: CargoEntity): Promise<CargoEntity>;
    delete(id: number): Promise<void>;
    getByIdExisting(id: number): Promise<number>;
    getById(id: number): Promise<CargoType>;
}
