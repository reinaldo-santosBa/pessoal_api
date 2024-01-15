import EnderecoEntity from "../entity/endereco";

export interface EnderecoRepository {
  insert(pessoa_id: number, input: EnderecoEntity): Promise<void>;
  update(pessoa_id: number, input: EnderecoEntity): Promise<EnderecoEntity>;
  delete(id: number): Promise<EnderecoEntity>;
  getByIdPessoa(pessoa_id: number): Promise<EnderecoEntity[]>;
}
