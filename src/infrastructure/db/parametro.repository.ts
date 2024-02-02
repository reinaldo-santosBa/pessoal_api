import AppError from "../../application/errors/AppError";
import ParametroEntity from "../../domain/entity/parametro";
import { ParametroRepository } from "../../domain/repository/parametro.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";


export default class ParametroPostgresRepository implements ParametroRepository {
    async insert(input: ParametroEntity): Promise<ParametroEntity> {
        try {
            await conn.query("BEGIN");
            const parametro = await conn.query(`INSERT INTO parametros (
                centro_resultado,
                limite_hora_extra_diario,
                limite_hora_extra_mensal
            ) VALUES (
                ${input.props.centro_resultado},
                ${input.props.limite_hora_extra_diario},
                ${input.props.limite_hora_extra_mensal}
            ) RETURNING *`);

            await conn.query("COMMIT");
            return parametro.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async getAll(): Promise<ParametroEntity[]> {
        try {
            const parametros = await conn.query(
                `SELECT centro_resultado,
limite_hora_extra_diario,
limite_hora_extra_mensal FROM parametros`,
            );
            return parametros.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async update(id: number, input: ParametroEntity): Promise<ParametroEntity> {
        try {
            await conn.query("BEGIN");
            const parametro =
              await conn.query(`UPDATE parametros SET centro_resultado = ${input.props.centro_resultado},
                limite_hora_extra_diario = ${input.props.limite_hora_extra_diario},
                limite_hora_extra_mensal = ${input.props.limite_hora_extra_mensal}
                WHERE ID = ${id} RETURNING *`);

            await conn.query("COMMIT");
            return parametro.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM PARAMETROS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
