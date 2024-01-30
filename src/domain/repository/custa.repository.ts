import CustaEntity from "../entity/custa";

export interface CustaRepository {
  insert(input: CustaEntity): Promise<CustaEntity>;
  getById(id: number): Promise<number>;
  getAllFuncionarioId(funcionario_id: number): Promise<CustaEntity[]>;
  getAll(): Promise<CustaEntity[]>;
  update(id: number, input: CustaEntity): Promise<CustaEntity>;
  delete(id: number): Promise<void>;
}
