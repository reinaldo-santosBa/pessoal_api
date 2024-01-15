import TelefoneEntity from "../entity/telefones";

export interface TelefoneRepository {
  insert(pessoa_id: number, input: TelefoneEntity): Promise<void>;
  update(pessoa_id: number, input: TelefoneEntity): Promise<TelefoneEntity>;
  delete(pessoa_id: number): Promise<void>;
  getByIdPessoa(pessoa_id: number): Promise<TelefoneEntity[]>;
}
