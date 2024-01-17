import AppError from "../../application/errors/AppError";
import EnderecoEntity from "../../domain/entity/endereco";
import { EnderecoRepository } from "../../domain/repository/endereco.repository";
import conn from "../config/database.config";

export default class EnderecoPostgresRepository implements EnderecoRepository {

    async insert(input: EnderecoEntity): Promise<EnderecoEntity> {

        try {
            await conn.query("BEGIN");
            const endereco = await conn.query(`INSERT INTO ENDERECOS (
                cep,
                logradouro,
                pessoa_id,
                tipo_endereco_id,
                complemento,
                numero,
                tipo_logradouro_id,
                bairro_id
          )VALUES(
            '${input.props.cep}',
            '${input.props.logradouro}',
            ${input.props.pessoa_id},
            ${input.props.tipo_endereco_id},
            '${input.props.complemento ?? null}',
            '${input.props.numero ?? null}',
            ${input.props.tipo_logradouro_id},
            ${input.props.bairro_id},
          ) RETURNING *`);
            await conn.query("COMMIT");
            return endereco.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async update(id: number, input: EnderecoEntity): Promise<EnderecoEntity> {
        try {
            await conn.query("BEGIN");

            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async getById(id: number): Promise<number> {
        try {
            const enderecosCount = (await conn.query(`SELECT * FROM ENDERECOS WHERE ID = ${id}`)).rowCount;
            return enderecosCount;
        } catch (error) {

            throw new AppError(error.message);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM ENDERECOS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async getByIdPessoa(pessoa_id: number): Promise<EnderecoEntity[]> {
        try {
            const enderecos = await conn.query(`SELECT id,
                cep,
                logradouro,
                pessoa_id,
                tipo_endereco_id,
                complemento,
                numero,
                tipo_logradouro_id,
                bairro_id
              FROM ENDERECOS WHERE PESSOA_ID = ${pessoa_id}`);

            return enderecos.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }
}
