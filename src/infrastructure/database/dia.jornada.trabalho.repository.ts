import AppError from "../../application/errors/AppError";
import DiaJornadaTrabalhoEntity from "../../domain/entity/dia.jornada.trabalho";
import { DiaJornadaTrabalhoRepository } from "../../domain/repository/dia.jornada.trabalho.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class DiaJornadaPostgresRepository implements DiaJornadaTrabalhoRepository {

  async getById(id: number): Promise<DiaJornadaTrabalhoEntity> {
    try {
      const diaJornadaTrabalho = await conn.query(`SELECT
                          id,
                          dia,
                          hora_inicio_turno_1,
                          hora_fim_turno_1,
                          hora_inicio_turno_2,
                          hora_fim_turno_2,
                          jornada_trabalho_id
                  FROM dias_jornada_trabalho WHERE ID = ${id}`);
      return diaJornadaTrabalho.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async insert(
    input: DiaJornadaTrabalhoEntity,
  ): Promise<DiaJornadaTrabalhoEntity> {
    try {
      await conn.query("BEGIN");

      const diaJornadaTrabalho = await conn.query(`INSERT INTO
            dias_jornada_trabalho(
                      dia,
                      hora_inicio_turno_1,
                      hora_fim_turno_1,
                      hora_inicio_turno_2,
                      hora_fim_turno_2,
                      jornada_trabalho_id
            )VALUES (
                  ${input.props.dia},
                  '${input.props.hora_inicio_turno_1}',
                  '${input.props.hora_fim_turno_1}',
                  '${input.props.hora_inicio_turno_2}',
                  '${input.props.hora_fim_turno_2}',
                  ${input.props.jornada_trabalho_id}
            ) RETURNING *`);

      await conn.query("COMMIT");

      return diaJornadaTrabalho.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getAll(): Promise<DiaJornadaTrabalhoEntity[]> {
    try {
      const diaJornadaTrabalho = await conn.query(`SELECT
                          id,
                          dia,
                          hora_inicio_turno_1,
                          hora_fim_turno_1,
                          hora_inicio_turno_2,
                          hora_fim_turno_2,
                          jornada_trabalho_id
                  FROM dias_jornada_trabalho`);
      return diaJornadaTrabalho.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(`DELETE FROM dias_jornada_trabalho WHERE ID = ${id}`);
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(
    id: number,
    input: DiaJornadaTrabalhoEntity,
  ): Promise<DiaJornadaTrabalhoEntity> {
    try {
      await conn.query("BEGIN");
      const diaJornadaTrabalho = await conn.query(
        `UPDATE dias_jornada_trabalho SET
                        dia = '${input.props.dia}',
                        hora_inicio_turno_1 = '${input.props.hora_inicio_turno_1}',
                        hora_fim_turno_1 = '${input.props.hora_fim_turno_1}',
                        hora_inicio_turno_2 = '${input.props.hora_inicio_turno_2}',
                        hora_fim_turno_2 = '${input.props.hora_fim_turno_2}',
                        jornada_trabalho_id  = ${input.props.jornada_trabalho_id}
              WHERE ID = ${id} RETURNING *`,
      );
      await conn.query("COMMIT");

      return diaJornadaTrabalho.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getByIdExisting(id: number): Promise<number> {
    const diaJornadaTrabalho = await conn.query(
      `SELECT ID FROM dias_jornada_trabalho WHERE ID = ${id}`,
    );
    return diaJornadaTrabalho.rowCount;
  }
}
