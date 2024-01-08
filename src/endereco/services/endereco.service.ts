import AppError from "../../application/errors/AppError";
import conn from "../../infrastructure/db/config.db";
import { EnderecoDto } from "../dto/endereco.dto";
import { UpdateEnderecoDto } from "../dto/update.endereco.dto";

export class EnderecoService {
    async create(props: EnderecoDto) {
        try {
            const camposObrigatorios = [
                "cep",
                "tipo_bairro_id",
                "logradouro",
                "numero",
                "pessoa_id",
                "tipo_logradouro_id"
            ];
            for (const campo of camposObrigatorios) {
                if (!props[campo]) {
                    throw new AppError(`Campo obrigatório: ${campo}`);
                }
            }

            const endereco = await conn.query(`
        INSERT INTO ENDERECO (
          CEP,
          LOGRADOURO,
          COMPLEMENTO,
          NUMERO,
          PESSOA_ID,
          BAIRRO_ID,
          CIDADE_ID,
          ESTADO_ID,
          TIPO_LOGRADOURO_ID,
          TIPO_BAIRRO_ID
          ) VALUES (
            ${props.cep},
            ${props.logradouro},
            ${props.complemento},
            ${props.numero},
            ${props.pessoa_id},
            ${props.bairro_id},
            ${props.ibge_cidade},
            ${props.estado},
            ${props.ibge_estado},
            ${props.regiao},
            ${props.pais},
            ${props.tipo_logradouro_id},
            ${props.tipo_bairro_id}
          )`);

            return endereco;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async update(props: UpdateEnderecoDto, pessoa_id: number) {
        /* const endereco =
        await conn.query(`UPDATE ENDERECO SET CEP,
          BAIRRO,
          LOGRADOURO,
          COMPLEMENTO,
          NUMERO,
          PESSOA_ID,
          CIDADE,
          IBGE_CIDADE,
          ESTADO,
          IBGE_ESTADO,
          REGIAO,
          PAIS,
          TIPO_LOGRADOURO_ID,
          TIPO_BAIRRO_ID = ${} WHERE PESSOA_ID = ${}`);*/
    }

    async delete() {}
}
