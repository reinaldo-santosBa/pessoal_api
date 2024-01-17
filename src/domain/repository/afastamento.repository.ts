import AfastamentoEntity from "../entity/afastamento";

export interface AfastamentoRepository {
  insert(input: AfastamentoEntity): Promise<AfastamentoEntity>;
  update(id: number, input: AfastamentoEntity): Promise<AfastamentoEntity>;
  getById(id: number): Promise<number>;
  delete(id: number): Promise<void>;
  getByIdFuncionario(funcionario_id: number): Promise<AfastamentoEntity[]>;
}
