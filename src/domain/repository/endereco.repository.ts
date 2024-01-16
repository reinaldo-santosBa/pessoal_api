import EnderecoEntity from "../entity/endereco";

export interface EnderecoRepository {
  insert(pessoa_id: number, input: EnderecoEntity): Promise<EnderecoEntity>;
  update(pessoa_id: number, input: EnderecoEntity): Promise<EnderecoEntity>;
  getById(id: number): Promise<number>;
  delete(id: number): Promise<void>;
  getByIdPessoa(pessoa_id: number): Promise<EnderecoEntity[]>;
}
