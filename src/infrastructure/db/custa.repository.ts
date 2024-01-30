import AppError from "../../application/errors/AppError";
import CustaEntity from "../../domain/entity/custa";
import { CustaRepository } from "../../domain/repository/custa.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";
export default class CustaPostgresRepository implements CustaRepository {
    async getAll(): Promise<CustaEntity[]> {
        try {
            const custas = await conn.query(`SELECT
            id,
            funcionario_id,
            responsavel_id,
            produto_id,
            servico_id,
            data_custa
            FROM CUSTAS`);
            return custas.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async insert(input: CustaEntity): Promise<CustaEntity> {
        try {

            await conn.query("BEGIN");
            const custa = await conn.query(`INSERT INTO CUSTAS (
            funcionario_id,
            responsavel_id,
            produto_id,
            servico_id,
            data_custa
          ) VALUES (
            ${input.props.funcionario_id},
            ${input.props.responsavel_id},
            ${input.props.produto_id ?? null},
            ${input.props.servico_id ?? null},
            '${input.props.data_custa}'
          ) RETURNING *`);

            await conn.query("COMMIT");
            return custa.rows[0];

        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async getAllFuncionarioId(funcionario_id: number): Promise<CustaEntity[]> {
        try {
            const custas = await conn.query(`SELECT
                    id,
                    funcionario_id,
                    responsavel_id,
                    produto_id,
                    servico_id,
                    data_custa
                  FROM CUSTAS WHERE funcionario_id = ${funcionario_id}`);

            return custas.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async update(id: number, input: CustaEntity): Promise<CustaEntity> {
        try {
            await conn.query("BEGIN");
            const custa = await conn.query(`
            UPDATE CUSTAS
            SET data_custa = '${input.props.data_custa}',
                produto_id = ${input.props.produto_id ?? null},
                servico_id = ${input.props.servico_id ?? null}
            WHERE ID = ${id}
            RETURNING *
          `);
            await conn.query("COMMIT");

            return custa.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async getById(id: number): Promise<number> {
        try {
            const custaCount = await conn.query(`SELECT ID FROM CUSTAS WHERE ID = ${id}`);

            return custaCount.rowCount;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }


    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM CUSTAS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
