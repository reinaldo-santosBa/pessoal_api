import TelefoneEntity from "../entity/telefones";

export interface TelefoneRepository {
  insert(input: TelefoneEntity): Promise<TelefoneEntity>;
  update(id: number, input: TelefoneEntity): Promise<TelefoneEntity>;
  delete(id: number): Promise<void>;
  getByIdPessoa(pessoa_id: number): Promise<TelefoneEntity[]>;
  getById(id: number): Promise<number>;
}
