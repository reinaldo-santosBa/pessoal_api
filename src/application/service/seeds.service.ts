import {
    EstadoCivilProps,
    GeneroProps,
    NacionalidadeProps,
    NaturalidadeProps,
    SeedsRepository,
    TipoBairroProps,
    TipoEmailProps,
    TipoLogradouroProps,
    TipoPcdProps,
    TipoTelefoneProps
} from "../../domain/repository/seeds.repository";


export default class SeedsService {
    constructor(private readonly seedsRepository: SeedsRepository) {}

    async findAllGenero(): Promise<GeneroProps[]> {
        return await this.seedsRepository.findAllGenero();
    }

    async findAllTipoEmail(): Promise<TipoEmailProps[]>{
        return await this.seedsRepository.findAllTipoEmail();
    }


    async findAllTipoBairro(): Promise<TipoBairroProps[]>{
        return await this.seedsRepository.findAllTipoBairro();
    }


    async findAllTipoTelefone(): Promise<TipoTelefoneProps[]>{
        return await this.seedsRepository.findAllTipoTelefone();
    }


    async findAllEstadoCivil(): Promise<EstadoCivilProps[]>{
        return await this.seedsRepository.findAllEstadoCivil();
    }

    async findAllTipoPcd(): Promise<TipoPcdProps[]>{
        return await this.seedsRepository.findAllTipoPcd();
    }

    async findAllTipoLogradouro(): Promise<TipoLogradouroProps[]>{
        return await this.seedsRepository.findAllTipoLogradouro();
    }

    async findAllNaturalidade(): Promise<NaturalidadeProps[]>{
        return await this.seedsRepository.findAllNaturalidade();
    }


    async findAllNacionalidade(): Promise<NacionalidadeProps[]>{
        return await this.seedsRepository.findAllNacionalidade();
    }
}
