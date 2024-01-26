import AppError from "../../application/errors/AppError";
import TipoAfastamentoEntity from "../../domain/entity/tipo.afastamento";
import { TipoAfastamentoRepository } from "../../domain/repository/tipo.afastamento.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";


export default class TipoAfastamentoPostgresRepository implements TipoAfastamentoRepository {

    async insert(input: TipoAfastamentoEntity): Promise<TipoAfastamentoEntity> {
        try {
            await conn.query("BEGIN");
            const tipoAfastamento = await conn.query(`INSERT INTO TIPOS_AFASTAMENTO(
              TIPO_AFASTAMENTO
            ) VALUES (
              '${input.props.tipo_afastamento}'
            )RETURNING *`);
            await conn.query("COMMIT");
            return tipoAfastamento.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM TIPOS_AFASTAMENTO WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async update(id: number, input: TipoAfastamentoEntity): Promise<TipoAfastamentoEntity> {
        try {
            await conn.query("BEGIN");
            const tipoAfastamento = await conn.query(`UPDATE TIPOS_AFASTAMENTO SET
              TIPO_AFASTAMENTO = '${input.props.tipo_afastamento}' WHERE ID = ${id}
              RETURNING *`);
            await conn.query("COMMIT");
            return tipoAfastamento.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async getAll(): Promise<TipoAfastamentoEntity[]> {
        try {
            const tiposAfastamento = await conn.query("SELECT ID, TIPO_AFASTAMENTO FROM TIPOS_AFASTAMENTO");
            return tiposAfastamento.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async getById(id: number): Promise<number> {
        try {
            const tiposAfastamento = await conn.query(`SELECT ID FROM TIPOS_AFASTAMENTO WHERE ID = ${id}`);
            return tiposAfastamento.rowCount;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
