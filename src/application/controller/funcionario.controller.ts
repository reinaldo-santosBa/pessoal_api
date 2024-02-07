import { Request, Response } from "express";
import FuncionarioService, { IInputProps } from "../service/funcionario.service";
import * as status from "../../constraints/http.stauts";
import Joi from "joi";

const emailSchema = Joi.object({
    tipo_email_id: Joi.number().allow(null).optional(),
    email: Joi.string().email().required(),
});

const telefoneSchema = Joi.object({
    numero: Joi.string().required(),
    tipo_telefne_id: Joi.number().allow(null).optional(),
});

const enderecoSchema = Joi.object({
    cep: Joi.string().min(8).max(8).required(),
    logradouro: Joi.string().required(),
    complemento: Joi.string().allow(null).optional(),
    numero: Joi.string().required(),
    tipo_endereco_id: Joi.number().allow(null).optional(),
    tipo_logradouro_id: Joi.number().allow(null).optional(),
    bairro_id: Joi.number().allow(null).optional(),
});


const contasBancariasSchema = Joi.object({
    conta: Joi.string().required(),
    digito: Joi.string().allow(null).optional(),
    tipo_conta_id: Joi.number().required(),
    operacao: Joi.string().allow(null).optional(),
    numero_agencia: Joi.string().required(),
    digito_agencia: Joi.string().allow(null).optional(),
    codigo_banco: Joi.string().allow(null).optional(),
    banco: Joi.string().required(),
});

const rateiosSchema = Joi.object({
    rateio_id: Joi.number().required(),
    centro_resultado_id: Joi.number().required(),
    centro_resultado: Joi.string().required(),
    percentual: Joi.number().required(),
});

const atividadesSchema = Joi.object({
    atividade_id: Joi.number().required()
});

const convenios_cidades_funcionarios = Joi.object({
    convenio_cidade_id: Joi.number().required(),
});

const schemaValidation = Joi.object({
    pessoa: {
        ativo: Joi.boolean().required(),
    },
    funcionario: {
        empresa_id: Joi.number().required(),
        cargo_id: Joi.number().required(),
        data_admissao: Joi.date().required(),
        data_demissao: Joi.date().allow(null).optional(),
        adiantamento: Joi.boolean(),
        periculosidade: Joi.boolean(),
        receber_transporte: Joi.boolean(),
        contribuicao_sindical: Joi.boolean(),
        jornada_trabalho_id: Joi.number().required(),
        registrado: Joi.boolean(),
    },
    pessoa_fisica: {
        nome: Joi.string().required(),
        cpf: Joi.string().min(11).max(11).required(),
        carteira_trabalho: Joi.string().allow(null).optional(),
        pis: Joi.number().allow(null).optional(),
        titulo_eleitor: Joi.string().allow(null).optional(),
        zona_titulo_eleitor: Joi.string().allow(null).optional(),
        nascimento: Joi.date().allow(null).optional(),
        nome_mae: Joi.string().allow(null).optional(),
        orgao_expeditor: Joi.string().allow(null).optional(),
        rg: Joi.string().allow(null).optional(),
        nome_pai: Joi.string().allow(null).optional(),
        naturalidade_id: Joi.number().allow(null).optional(),
        nacionalidade_id: Joi.number().allow(null).optional(),
        estado_civil_id: Joi.number().allow(null).optional(),
        genero_id: Joi.number().allow(null).optional(),
        pcd_id: Joi.number().allow(null).optional(),
    },
    enderecos: Joi.array().items(enderecoSchema),
    emails: Joi.array().items(emailSchema),
    telefones: Joi.array().items(telefoneSchema),
    contas_bancarias: Joi.array().items(contasBancariasSchema),
    rateios: Joi.array().items(rateiosSchema).required(),
    centro_resultado_id: Joi.number().required(),
    atividades_funcionarios: Joi.array().items(atividadesSchema),
    convenios_cidades_funcionarios: Joi.array().items(
        convenios_cidades_funcionarios,
    ),
});


export default class FuncionarioController {
    constructor(private readonly funcionarioService: FuncionarioService) {}

    async create(request: Request, response: Response) {
        const input = request.body as IInputProps;

        const { error } = schemaValidation.validate(input);

        if (error) {
            return response
                .status(status.UNPROCESSABLE_ENTITY)
                .json({ error: error.details[0].message });
        }

        const funcionario = await this.funcionarioService.create(input);
        return response.status(status.CREATED).json(funcionario);
    }

    async getAll(request: Request, response: Response) {
        const funcionarios = await this.funcionarioService.getAll();
        return response.json(funcionarios);
    }

    async getById(request: Request, response: Response) {
        const pessoa_id = request.params.pessoa_id;
        const funcionario = await this.funcionarioService.getById(+pessoa_id);
        return response.json(funcionario);
    }
}
