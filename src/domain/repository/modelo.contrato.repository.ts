import ModeloContratoEntity from "../entity/modelo.contrato";

export interface ModeloContratoRepository {
  insert(input: ModeloContratoEntity): Promise<ModeloContratoEntity>;
  update(id: number, input: ModeloContratoEntity): Promise<ModeloContratoEntity>;
  delete(id: number): Promise<void>;
  getAll(): Promise<ModeloContratoEntity[]>;
  getByIdExisting(id: number): Promise<number>;
  getById(id: number): Promise<ModeloContratoEntity>;
}
