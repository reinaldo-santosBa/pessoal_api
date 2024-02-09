import EnderecoEntity, {
  BairrosProps,
  CidadesProps,
  EnderecoProps,
  EstadoProps
} from "../../domain/entity/endereco";
import { EnderecoRepository } from "../../domain/repository/endereco.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class EnderecoService {
  constructor(private readonly enderecoRepository: EnderecoRepository) {}

  async create(input: EnderecoProps): Promise<EnderecoEntity> {
    const camposObrigatorios: string[] = [
      "cep",
      "logradouro",
      "pessoa_id"
    ];

    for (const campo of camposObrigatorios) {
      if (!input[campo]) {
        throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
      }
    }

    const endereco = new EnderecoEntity(input);
    const newEndereco = await this.enderecoRepository.insert(endereco);

    return newEndereco;
  }

  async update(id: number, input: EnderecoProps): Promise<EnderecoEntity> {
    const existingEndereco = await this.enderecoRepository.getById(id);
    if (!existingEndereco) {
      throw new AppError("Endereco não encontrado", status.NOT_FOUND);
    }

    const endereco = new EnderecoEntity(input);
    const updateEndereco = await this.enderecoRepository.update(id,endereco);

    return updateEndereco;
  }


  async delete(id: number): Promise<void> {
    const existingEndereco = await this.enderecoRepository.getById(id);
    if (!existingEndereco) {
      throw new AppError("Endereco não encontrado", status.NOT_FOUND);
    }
    await this.enderecoRepository.delete(id);
  }

  async getByIdPessoa(pessoa_id: number): Promise<EnderecoEntity[]> {
    const enderecos = await this.enderecoRepository.getByIdPessoa(pessoa_id);
    return enderecos;
  }

  async getEstados(): Promise<EstadoProps[]> {
    const estados = await this.enderecoRepository.getEstados();
    return estados;
  }

  async getCidades(estado_id: number): Promise<CidadesProps[]> {
    const cidades = await this.enderecoRepository.getCidades(estado_id);
    return cidades;
  }

  async getBairros(cidade_id: number): Promise<BairrosProps[]> {
    const bairros = await this.enderecoRepository.getBairros(cidade_id);
    return bairros;
  }

  async getBairroById(id: number): Promise<BairrosProps> {
    const bairro = await this.enderecoRepository.getBairroById(id);
    return bairro;
  }
}
