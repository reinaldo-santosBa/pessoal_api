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

            await conn.query("BEGIN");
            const endereco = await conn.query(`
        INSERT INTO ENDERECO (
          CEP,
          LOGRADOURO,
          TIPO_LOGRADOURO_ID,
          COMPLEMENTO,
          NUMERO,
          PESSOA_ID,
          TIPO_ENDERECO_ID,
          BAIRRO_ID
          ) VALUES (
            '${props.cep}',
            '${props.logradouro}',
            ${props.tipo_logradouro_id},
            '${props.complemento}',
            ${props.numero},
            ${props.pessoa_id},
            ${props.tipo_endereco_id},
            ${props.bairro_id}
          )`);

            const cidades = await conn.query(`INSERT INTO CIDADES(
            CODIGO_IBGE,
            CIDADE,
            ESTADO_ID
          )VALUES(
            ${props.codigo_cidade_ibge},
            '${props.cidade}',
            ${props.estado_id}
          )`);


            const bairro = await conn.query(`INSERT INTO BAIRROS(
              CIDADE_ID,
              BAIRRO,
              TIPO_BAIRRO_ID
            ) VALUES(
              ${props.cidade_id},
             '${props.bairro}',
              ${props.tipo_bairro_id}
            )`);


            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    /*
    async update(props: UpdateEnderecoDto, pessoa_id: number) {
        const endereco =
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
          TIPO_BAIRRO_ID = ${} WHERE PESSOA_ID = ${}`);
    }

    async delete() {}*/
}
