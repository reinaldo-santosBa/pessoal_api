import JornadaTrabalhoEntity from "../../domain/entity/jornada.trabalho";
import { JornadaTrabalhoRepository } from "../../domain/repository/jornada.trabalho.repository";
import conn from "../config/database.config";

export default class JornadaTrabalhoPostgresRepository implements JornadaTrabalhoRepository {
    async insert(input: JornadaTrabalhoEntity): Promise<JornadaTrabalhoEntity> {
        try {
            await conn.query("BEGIN");
            const jornada = await conn.query(`INSERT INTO JORNADAS_TRABALHO(
            JORNADA_TRABALHO,
            CARGA_DIARIA,
            UNIDADE_TEMPO,
            CARGA_SEMANAL,
            LIMITE_EXTRA_DIARIO,
            LIMITE_EXTRA_SEMANL,
            LIMITE_EXTRA_MENSAL
        )VALUES(
          '${input.props.jornada_trabalho}',
          ${input.props.carga_diaria},
          '${input.props.unidade_tempo ?? null}',
          ${input.props.carga_semanal},
          ${input.props.limite_extra_diario},
          ${input.props.limite_extra_mensal ?? null},
          ${input.props.limite_extra_semanl ?? null}
        ) RETURNING *`);

            await conn.query("COMMIT");

            return jornada.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
        }
    }

    async getAll(): Promise<JornadaTrabalhoEntity[]> {
        try {
            await conn.query("BEGIN");
            const jornadasTrabalho = await conn.query(
                `SELECT ID,
            JORNADA_TRABALHO,
            CARGA_DIARIA,
            UNIDADE_TEMPO,
            CARGA_SEMANAL,
            LIMITE_EXTRA_DIARIO,
            LIMITE_EXTRA_SEMANL,
            LIMITE_EXTRA_MENSAL FROM JORNADAS_TRABALHO`,
            );
            await conn.query("COMMIT");
            return jornadasTrabalho.rows;
        } catch (error) {
            await conn.query("ROLLBACK");
            console.error(error);
        }
    }

    async getById(id: number): Promise<number> {
        const jornada = await conn.query(
            `SELECT * FROM JORNADAS_TRABALHO WHERE ID = ${id}`,
        );

        return jornada.rowCount;
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM JORNADAS_TRABALHO WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            console.error(error);
        }
    }

    async update(id: number, input: JornadaTrabalhoEntity): Promise<JornadaTrabalhoEntity> {
        try {
            await conn.query("BEGIN");
            const jornada = await conn.query(
                `UPDATE JORNADAS_TRABALHO SET
                  JORNADA_TRABALHO = '${input.props.jornada_trabalho}',
                  CARGA_DIARIA = ${input.props.carga_diaria},
                  UNIDADE_TEMPO = '${input.props.unidade_tempo}',
                  CARGA_SEMANAL = ${input.props.carga_semanal},
                  LIMITE_EXTRA_DIARIO = ${input.props.limite_extra_diario},
                  LIMITE_EXTRA_SEMANL = ${input.props.limite_extra_semanl ?? null},
                  LIMITE_EXTRA_MENSAL = ${input.props.limite_extra_mensal ?? null}
              WHERE ID = ${id} RETURNING *`,
            );

            await conn.query("COMMIT");
            return jornada.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
        }
    }
}
