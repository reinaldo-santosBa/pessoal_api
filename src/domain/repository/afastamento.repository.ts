import AfastamentoEntity from "../entity/afastamento";

export interface AfastamentoRepository {
  insert(input: AfastamentoEntity): Promise<AfastamentoEntity>;
  update(id: number, input: AfastamentoEntity): Promise<AfastamentoEntity>;
  getByIdExisting(id: number): Promise<number>;
  getById(id: number): Promise<AfastamentoEntity>;
  getAll(): Promise<AfastamentoEntity[]>;
  delete(id: number): Promise<void>;
  getByIdFuncionario(funcionario_id: number): Promise<AfastamentoEntity[]>;
}
