import {Request,Response} from "express";
import { FuncionarioService } from "../service/funcionario.service";
import { FuncionarioDto } from "../dto/funcionario.dto";

export default class FuncionarioController {
    async create(request: Request, response: Response) {
        const {
            nome,
            nome_mae,
            nome_pai,
            ativo,
            carteira_trabalho,
            cpf,
            data_admissao,
            empresa_id,
            orgao_expeditor,
            nacionalidade_id,
            pis,
            cargo_id,
            estado_civil_id,
            genero_id,
            nascimento,
            naturalidade_id,
            rg,
            titulo_eleitor,
            zona_titulo_eleitor} = request.body as FuncionarioDto;
        const funcionarioService = new FuncionarioService();

        const funcionario = await funcionarioService.create(
            {
                nome,
                nome_mae,
                nome_pai,
                ativo,
                carteira_trabalho,
                cpf,
                data_admissao,
                empresa_id,
                orgao_expeditor,
                nacionalidade_id,
                pis,
                cargo_id,
                estado_civil_id,
                genero_id,
                nascimento,
                naturalidade_id,
                rg,
                titulo_eleitor,
                zona_titulo_eleitor,
            },
        );

        return response.status(201).json(funcionario);

    }

    async find() {}

    async findByname() {}

    async findById() {}

    async update() {}

    async delete() {}
}
