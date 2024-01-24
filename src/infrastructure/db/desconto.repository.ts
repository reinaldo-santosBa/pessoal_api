import AppError from "../../application/errors/AppError";
import DescontoEntity from "../../domain/entity/desconto";
import { DescontoRepository } from "../../domain/repository/desconto.repository";
import conn from "../config/database.config";

export default class DescontoPostgresRepository implements DescontoRepository {

    async insert(input: DescontoEntity): Promise<DescontoEntity> {
        try {

            await conn.query("BEGIN");
            const desconto = await conn.query(`INSERT INTO DESCONTOS (
            DESCONTO
          )VALUES(
            '${input.props.desconto}'
          ) RETURNING *`);

            await conn.query("COMMIT");
            return desconto.rows[0];

        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }


    async getAll(): Promise<DescontoEntity[]> {
        try {
            const desconto = await conn.query("SELECT ID, DESCONTO FROM DESCONTOS");
            return desconto.rows;
        } catch (error) {
            throw new AppError(error.message);
        }

    }


    async update(id: number, input: DescontoEntity): Promise<DescontoEntity> {
        try {
            await conn.query("BEGIN");
            const desconto = await conn.query(`UPDATE DESCONTOS
            SET DESCONTO = '${input.props.desconto}'
          WHERE ID = ${id} RETURNING *`);
            await conn.query("COMMIT");

            return desconto.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }


    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM DESCONTOS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }
}
