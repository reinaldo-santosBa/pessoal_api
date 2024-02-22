import { AllModeloContrato } from "../../infrastructure/database/modelo.contrato.repository";
import ModeloContratoEntity from "../entity/modelo.contrato";

export interface ModeloContratoRepository {
    insert(input: ModeloContratoEntity): Promise<ModeloContratoEntity>;
    update(
        id: number,
        input: ModeloContratoEntity,
    ): Promise<ModeloContratoEntity>;
    delete(id: number): Promise<void>;
    getAll(): Promise<AllModeloContrato[]>;
    getByIdExisting(id: number): Promise<number>;
    getById(id: number): Promise<ModeloContratoEntity>;
}
