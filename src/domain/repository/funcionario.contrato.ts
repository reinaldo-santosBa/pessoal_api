import { FuncionarioContratoEntity } from "../entity/funcionario.contrato";

export interface FuncionarioContratoRepository {
  insert(input: FuncionarioContratoEntity): Promise<FuncionarioContratoEntity>;
  update(id: number, input: FuncionarioContratoEntity): Promise<FuncionarioContratoEntity>;
  getById(id: number): Promise<number>;
  delete(id: number): Promise<void>;
  getByIdFuncionario(funcionario_id: number): Promise<FuncionarioContratoEntity[]>;
}
