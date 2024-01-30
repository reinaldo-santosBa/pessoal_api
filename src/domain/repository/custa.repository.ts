import CustaEntity from "../entity/custa";

export interface CustaRepository {
  insert(input: CustaEntity): Promise<CustaEntity>;
  getByIdExisting(id: number): Promise<number>;
  getById(id: number): Promise<CustaEntity>;
  getAllFuncionarioId(funcionario_id: number): Promise<CustaEntity[]>;
  getAll(): Promise<CustaEntity[]>;
  update(id: number, input: CustaEntity): Promise<CustaEntity>;
  delete(id: number): Promise<void>;
}
