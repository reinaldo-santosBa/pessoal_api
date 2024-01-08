import {Request, Response } from "express";
import { EnderecoService } from "../services/endereco.service";
import { EnderecoDto } from "../dto/endereco.dto";

export class EnderecoController{
    async create(request: Request, response: Response) {
        const enderecoService = new EnderecoService();

        const {cep,
            bairro,
            cidade,
            complemento,
            estado,
            ibge_cidade,
            ibge_estado,
            logradouro,
            numero,
            pessoa_id,
            tipo_bairro_id,
            tipo_logradouro_id,
            pais,
            regiao } = request.body as EnderecoDto;

        const endereco = await enderecoService.create({
            cep,
            bairro,
            cidade,
            complemento,
            estado,
            ibge_cidade,
            ibge_estado,
            logradouro,
            numero,
            pessoa_id,
            tipo_bairro_id,
            tipo_logradouro_id,
            pais,
            regiao,
        });

        return response.status(201).json(endereco);
    }

}
