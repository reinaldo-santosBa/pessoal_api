import { EnderecoProps } from "../../domain/entity/endereco";
import EnderecoService from "../service/endereco.service";
import { Request, Response } from "express";

import Joi from "joi";

const schemaValidation = Joi.object({
    cep: Joi.string().min(8).max(8).required(),
    logradouro: Joi.string().required(),
    pessoa_id: Joi.number().required(),
    complemento: Joi.string().allow(null),
    numero: Joi.string().required(),
    tipo_endereco_id: Joi.number().allow(null),
    tipo_logradouro_id: Joi.number().allow(null),
    bairro_id: Joi.number().allow(null),
});


export default class EnderecoController {
    constructor(private readonly enderecoService: EnderecoService) {}

    async create(request: Request, response: Response) {
        const input = request.body as EnderecoProps;
        const { error } = schemaValidation.validate(input);

        if (error) {
            return response.status(422).json({error: error.details[0].message});
        }

        const newEndereco = await this.enderecoService.create(input);

        return response.status(201).json(newEndereco);
    }


    async update(request: Request, response: Response) {
        const id = request.params.id;
        const input = request.body as EnderecoProps;
        const updateEndereco = await this.enderecoService.update(+id, input);

        return response.json(updateEndereco);
    }


    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.enderecoService.delete(+id);
        return response.status(204).json();
    }


    async getByIdPessoa(request: Request, response: Response) {
        const pessoa_id = request.params.pessoa_id;
        const enderecos = await this.enderecoService.getByIdPessoa(+pessoa_id);
        return response.json(enderecos);
    }


    async getRegioes(request: Request, response: Response) {
        const regioes = await this.enderecoService.getRegioes();
        return response.json(regioes);
    }


    async getEstados(request: Request, response: Response) {
        const regiao_id = request.params.regiao_id;
        const estados = await this.enderecoService.getEstados(+regiao_id);
        return response.json(estados);
    }


    async getCidades(request: Request, response: Response) {
        const estado_id = request.params.estado_id;
        const cidades = await this.enderecoService.getCidades(+estado_id);
        return response.json(cidades);
    }


    async getBairros(request: Request, response: Response) {
        const cidade_id = request.params.cidade_id;
        const bairros = await this.enderecoService.getBairros(+cidade_id);
        return response.json(bairros);
    }
}
