import SeedsService from "../service/seeds.service";
import { Request, Response } from "express";


export default class SeedsController {
    constructor(private readonly seedsService: SeedsService) {}

    async findAllGenero(request: Request, response: Response) {
        const generos = await this.seedsService.findAllGenero();
        return response.json(generos);
    }

    async findAllTipoEmail(request: Request, response: Response) {
        const tipoEmail = await this.seedsService.findAllTipoEmail();
        return response.json(tipoEmail);
    }

    async findAllTipoBairro(request: Request, response: Response) {
        const tipoBairro = await this.seedsService.findAllTipoBairro();
        return response.json(tipoBairro);
    }

    async findAllTipoTelefone(request: Request, response: Response) {
        const tipoTelefone = await this.seedsService.findAllTipoTelefone();
        return response.json(tipoTelefone);
    }

    async findAllEstadoCivil(request: Request, response: Response) {
        const estadoCivil = await this.seedsService.findAllEstadoCivil();
        return response.json(estadoCivil);
    }

    async findAllTipoPcd(request: Request, response: Response) {
        const tipoPcd = await this.seedsService.findAllTipoPcd();
        return response.json(tipoPcd);
    }

    async findAllTipoLogradouro(request: Request, response: Response) {
        const tipoLogradouro = await this.seedsService.findAllTipoLogradouro();
        return response.json(tipoLogradouro);
    }

    async findAllNaturalidade(request: Request, response: Response) {
        const naturalidades = await this.seedsService.findAllNaturalidade();
        return response.json(naturalidades);
    }

    async findAllNacionalidade(request: Request, response: Response) {
        const nacionalidades = await this.seedsService.findAllNacionalidade();
        return response.json(nacionalidades);
    }

    async findAllTipoConta(request: Request, response: Response) {
        const tipoConta = await this.seedsService.findAllTipoConta();
        return response.json(tipoConta);
    }

    async findAllTipoEndereco(request: Request, response: Response) {
        const tipoEndereco = await this.seedsService.findAllTipoEndereco();
        return response.json(tipoEndereco);
    }
}
