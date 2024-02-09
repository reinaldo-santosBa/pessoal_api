import EnderecoEntity, {
  BairrosProps,
  CidadesProps,
  EstadoProps,
} from "../entity/endereco";

export interface EnderecoRepository {
  insert(input: EnderecoEntity): Promise<EnderecoEntity>;
  update(id: number, input: EnderecoEntity): Promise<EnderecoEntity>;
  getById(id: number): Promise<number>;
  delete(id: number): Promise<void>;
  getByIdPessoa(pessoa_id: number): Promise<EnderecoEntity[]>;
  getEstados(): Promise<EstadoProps[]>;
  getCidades(estado_id: number): Promise<CidadesProps[]>;
  getBairros(cidade_id: number): Promise<BairrosProps[]>;
  getBairroById(id: number): Promise<BairrosProps>;
}
