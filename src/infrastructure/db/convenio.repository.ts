import AppError from "../../application/errors/AppError";
import ConvenioEntity from "../../domain/entity/convenio";
import { ConvenioRepository } from "../../domain/repository/convenio.repository";
import conn from "../config/database.config";


export default class ConvenioPostgresRepository implements ConvenioRepository {
    async insert(input: ConvenioEntity): Promise<ConvenioEntity> {
        try {
            await conn.query("BEGIN");
            const convenio = await conn.query(`INSERT INTO CONVENIOS(
            CONVENIO
          )VALUES (
            '${input.props.convenio}'
          ) RETURNING *`);
            await conn.query("COMMIT");
            return convenio.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM CONVENIOS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async update(id: number, input: ConvenioEntity): Promise<ConvenioEntity> {
        try {
            await conn.query("BEGIN");
            const convenio = await conn.query(`UPDATE CONVENIOS
              SET CONVENIO = '${input.props.convenio}'
              WHERE ID = ${id} RETURNING *`);
            await conn.query("COMMIT");
            return convenio.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async getAll(): Promise<ConvenioEntity[]> {
        try {
            const convenios = await conn.query("SELECT ID, CONVENIO FROM CONVENIOS");
            return convenios.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async getById(id: number): Promise<number> {
        try {
            const convenios = await conn.query(`SELECT ID FROM CONVENIOS WHERE ID = ${id}`);
            return convenios.rowCount;
        } catch (error) {
            throw new AppError(error.message);
        }
    }
}
