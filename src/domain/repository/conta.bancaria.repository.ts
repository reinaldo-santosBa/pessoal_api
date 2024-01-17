import ContaBancariaEntity from "../entity/conta.bancaria";

export interface ContaBancariaRepository {
  insert(input: ContaBancariaEntity): Promise<ContaBancariaEntity>;
  getAll(): Promise<ContaBancariaEntity[]>;
  update(id: number, input: ContaBancariaEntity): Promise<ContaBancariaEntity>;
  delete(id: number): Promise<void>;
  getByIdPessoa(pessoa_id: number): Promise<ContaBancariaEntity[]>;
  getById(id: number): Promise<number>;
}
