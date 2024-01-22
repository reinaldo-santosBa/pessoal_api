import EnderecoEntity, {
    BairrosProps,
    CidadesProps,
    EnderecoProps,
    EstadoProps,
    RigoesProps
} from "../../domain/entity/endereco";
import { EnderecoRepository } from "../../domain/repository/endereco.repository";
import AppError from "../errors/AppError";


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
                throw new AppError(`${campo} obrigatório`, 400);
            }
        }

        const endereco = new EnderecoEntity(input);
        const newEndereco = await this.enderecoRepository.insert(endereco);

        return newEndereco;
    }

    async update(id: number, input: EnderecoProps): Promise<EnderecoEntity> {
        const existingEndereco = await this.enderecoRepository.getById(id);
        if (!existingEndereco) {
            throw new AppError("Endereco não encontrado");
        }

        const endereco = new EnderecoEntity(input);
        const updateEndereco = await this.enderecoRepository.update(id,endereco);

        return updateEndereco;
    }


    async delete(id: number): Promise<void> {
        const existingEndereco = await this.enderecoRepository.getById(id);
        if (!existingEndereco) {
            throw new AppError("Endereco não encontrado");
        }
        await this.enderecoRepository.delete(id);
    }

    async getByIdPessoa(pessoa_id: number): Promise<EnderecoEntity[]> {
        const enderecos = await this.enderecoRepository.getByIdPessoa(pessoa_id);
        return enderecos;
    }

    async getRegioes(): Promise<RigoesProps[]>{
        const regioes = await this.enderecoRepository.getRegioes();
        if (!regioes) {
            throw new AppError("jdsadakjlkjkj");
        }
        return regioes;
    }

    async getEstados(regiao_id: number): Promise<EstadoProps[]> {
        const estados = await this.enderecoRepository.getEstados(regiao_id);
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
}
