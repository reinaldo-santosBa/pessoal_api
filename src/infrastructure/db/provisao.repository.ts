import AppError from "../../application/errors/AppError";
import ProvisaoEntity from "../../domain/entity/provisao";
import { ProvisaoRepository } from "../../domain/repository/provisao.repository";
import conn from "../config/database.config";

export default class ProvisaoPostgresRepository implements ProvisaoRepository {
    async insert(input: ProvisaoEntity): Promise<ProvisaoEntity> {
        try {
            await conn.query("BEGIN");
            const provisao = await conn.query(`INSERT INTO PROVISOES(
            PROVISAO
          ) VALUES(
            '${input.props.provisao}'
          ) RETURNING *`);

            await conn.query("COMMIT");
            return provisao.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }

    }

    async getAll(): Promise<ProvisaoEntity[]> {
        try {
            const provisao = await conn.query("SELECT ID, PROVISAO FROM PROVISOES");
            return provisao.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async update(id: number, input: ProvisaoEntity): Promise<ProvisaoEntity> {
        try {
            await conn.query("BEGIN");
            const provisao = await conn.query(`UPDATE PROVISOES
            SET PROVISAO = '${input.props.provisao}'
            WHERE ID = ${id}
            RETURNING *`);

            await conn.query("COMMIT");
            return provisao.rows[0];

        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }

    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM PROVISOES WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }

    }
}
