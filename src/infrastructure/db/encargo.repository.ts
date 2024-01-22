import AppError from "../../application/errors/AppError";
import EncargoEntity from "../../domain/entity/encargos";
import { EncargoRepository } from "../../domain/repository/encargo.repository";
import conn from "../config/database.config";

export default class EncargoPostgresRepository implements EncargoRepository {
    async insert(input: EncargoEntity): Promise<EncargoEntity> {
        try {
            await conn.query("BEGIN");
            const encargo = await conn.query(`INSERT INTO ENCARGOS(
            ENCARGO
          )VALUES (
            '${input.props.encargo}'
          ) RETURNING *`);
            await conn.query("COMMIT");
            return encargo.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM ENCARGOS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async update(id: number, input: EncargoEntity): Promise<EncargoEntity> {
        try {
            await conn.query("BEGIN");
            const encargo = await conn.query(`UPDATE ENCARGOS
            SET ENCARGO = '${input.props.encargo}'
            WHERE ID = ${id} RETURNING *`);
            await conn.query("COMMIT");
            return encargo.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async getAll(): Promise<EncargoEntity[]> {
        try {
            const encargos = await conn.query("SELECT ID, ENCARGO FROM ENCARGOS");
            return encargos.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async getById(id: number): Promise<number> {
        try {
            const encargos = await conn.query(`SELECT ID FROM ENCARGOS WHERE ID = ${id}`);
            return encargos.rowCount;
        } catch (error) {
            throw new AppError(error.message);
        }
    }
}
