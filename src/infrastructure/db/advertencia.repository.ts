import AppError from "../../application/errors/AppError";
import AdvertenciaEntity from "../../domain/entity/advertencia";
import { AdvertenciaRepository } from "../../domain/repository/advertencia.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class AdvertenciaPostgresRepository implements AdvertenciaRepository {

    async insert(input: AdvertenciaEntity): Promise<AdvertenciaEntity> {
        try {
            await conn.query("BEGIN");

            const advertencia = await conn.query(`INSERT INTO ADVERTENCIAS (
            funcionario_id,
            responsavel_id,
            advertencia,
            data
            ) VALUES (
              ${input.props.funcionario_id},
              ${input.props.responsavel_id },
              '${input.props.advertencia}',
              '${input.props.data}'
            ) RETURNING *`);
            console.log(advertencia);
            await conn.query("COMMIT");

            return advertencia.rows[0];

        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }

    }

    async update(id: number, input: AdvertenciaEntity): Promise<AdvertenciaEntity> {
        try {
            await conn.query("BEGIN");
            const updateAdvertencia = await conn.query(`UPDATE ADVERTENCIAS
            SET responsavel_id = ${input.props.responsavel_id},
            advertencia = '${input.props.advertencia}',
            data = '${input.props.data}'
            WHERE ID = ${id} RETURNING *
          `);

            await conn.query("COMMIT");
            return updateAdvertencia.rows[0];

        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }

    }

    async getById(id: number): Promise<number> {
        const countAdvertencia = await conn.query(
            `SELECT * FROM ADVERTENCIAS WHERE ID = ${id}`,
        );

        return countAdvertencia.rowCount;
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM ADVERTENCIAS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }

    }

    async  getByIdFuncionario(funcionario_id: number): Promise<AdvertenciaEntity[]> {
        const advertencias = await conn.query(`SELECT
            id,
            funcionario_id,
            responsavel_id,
            advertencia,
            data
          FROM  ADVERTENCIAS WHERE FUNCIONARIO_ID = ${funcionario_id}
          `);

        return advertencias.rows;
    }

}
