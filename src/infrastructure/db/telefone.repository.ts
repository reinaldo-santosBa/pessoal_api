import AppError from "../../application/errors/AppError";
import TelefoneEntity from "../../domain/entity/telefones";
import { TelefoneRepository } from "../../domain/repository/telefone.repository";
import conn from "../config/database.config";


export default class TelefonePostgresRepository implements TelefoneRepository {

    async insert(input: TelefoneEntity): Promise<TelefoneEntity> {
        try {
            await conn.query("BEGIN");

            const telefone = await conn.query(`INSERT INTO TELEFONES(
            PESSOA_ID,
            NUMERO,
            TIPO_TELEFNE_ID
          ) VALUES(
            ${input.props.pessoa_id},
           '${input.props.numero}',
            ${input.props.tipo_telefne_id}
          ) RETURNING *`);
            await conn.query("COMMIT");

            return telefone.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async update(id: number, input: TelefoneEntity): Promise<TelefoneEntity> {
        try {
            await conn.query("BEGIN");

            const telefone = await conn.query(`UPDATE TELEFONES SET
              NUMERO = '${input.props.numero}',
              TIPO_TELEFNE_ID = ${input.props.tipo_telefne_id}
              WHERE ID = ${id} RETURNING *`);

            await conn.query("COMMIT");
            return telefone.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM TELEFONES WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async getByIdPessoa(pessoa_id: number): Promise<TelefoneEntity[]> {
        try {
            await conn.query("BEGIN");

            const telefone = await conn.query(
                `SELECT ID, NUMERO, tipo_telefne_id, PESSOA_ID FROM TELEFONES WHERE PESSOA_ID = ${pessoa_id}`,
            );

            await conn.query("COMMIT");
            return telefone.rows;
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async getById(id: number): Promise<number> {
        const telefoneCount = await conn.query(`SELECT * FROM TELEFONES WHERE ID = ${id}`);
        return telefoneCount.rowCount;
    }

}
