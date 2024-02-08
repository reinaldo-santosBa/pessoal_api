import JornadaTrabalhoEntity from "../../domain/entity/jornada.trabalho";
import { CargaDiariaOutput, JornadaTrabalhoRepository } from "../../domain/repository/jornada.trabalho.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";
import AppError from "../../application/errors/AppError";

export default class JornadaTrabalhoPostgresRepository implements JornadaTrabalhoRepository {
  async getByFuncionarioId(funcionario_id: number): Promise<CargaDiariaOutput> {
    try {
      const jornada_trabalho = await conn.query(`SELECT
                jt.CARGA_DIARIA,
                jt.turnos
            FROM jornadas_trabalho jt  inner join funcionarios f on jt.id  = f.jornada_trabalho_id
            where f.id = ${funcionario_id}`);

      return jornada_trabalho.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getById(id: number): Promise<JornadaTrabalhoEntity> {
    try {
      const jornada_trabalho = await conn.query(`SELECT ID,
                JORNADA_TRABALHO,
                CARGA_DIARIA,
                UNIDADE_TEMPO,
                CARGA_SEMANAL
            FROM JORNADAS_TRABALHO WHERE ID = ${id}`);
      return jornada_trabalho.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async insert(input: JornadaTrabalhoEntity): Promise<JornadaTrabalhoEntity> {
    try {
      await conn.query("BEGIN");
      const jornada = await conn.query(`INSERT INTO JORNADAS_TRABALHO(
            JORNADA_TRABALHO,
            CARGA_DIARIA,
            UNIDADE_TEMPO,
            CARGA_SEMANAL,
            TURNOS
        )VALUES(
          '${input.props.jornada_trabalho}',
          ${input.props.carga_diaria},
          '${input.props.unidade_tempo ?? null}',
          ${input.props.carga_semanal},
          ${input.props.turno}
        ) RETURNING *`);

      await conn.query("COMMIT");

      return jornada.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
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
                        CARGA_SEMANAL
                FROM JORNADAS_TRABALHO`,
      );
      await conn.query("COMMIT");
      return jornadasTrabalho.rows;
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getByIdExisting(id: number): Promise<number> {
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
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(
    id: number,
    input: JornadaTrabalhoEntity,
  ): Promise<JornadaTrabalhoEntity> {
    try {
      await conn.query("BEGIN");
      const jornada = await conn.query(
        `UPDATE JORNADAS_TRABALHO SET
                  JORNADA_TRABALHO = '${input.props.jornada_trabalho}',
                  CARGA_DIARIA = ${input.props.carga_diaria},
                  UNIDADE_TEMPO = '${input.props.unidade_tempo}',
                  CARGA_SEMANAL = ${input.props.carga_semanal},
                  TURNOS = ${input.props.turno}
              WHERE ID = ${id} RETURNING *`,
      );

      await conn.query("COMMIT");
      return jornada.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
