import AppError from "../../application/errors/AppError";
import FaltaEntity from "../../domain/entity/falta";
import { FaltaRepository } from "../../domain/repository/falta.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";


export default class FaltaPostgresRepository implements FaltaRepository {
  async getById(id: number): Promise<FaltaEntity> {
    try {
      const faltas = await conn.query(`SELECT id,
funcionario_id,
data_falta,
horas FROM FALTAS WHERE ID = ${id}`);
      return faltas.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async insert(input: FaltaEntity): Promise<FaltaEntity> {
    try {
      await conn.query("BEGIN");
      const falta = await conn.query(`INSERT INTO FALTAS (
                                                                funcionario_id,
                                                                data_falta,
                                                                horas
                                                        ) VALUES(
                                                            ${input.props.funcionario_id},
                                                            '${input.props.data_falta}',
                                                            '${input.props.horas}'
                                                        ) RETURNING *`);
      await conn.query("COMMIT");
      return falta.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getAll(): Promise<FaltaEntity[]> {
    try {
      const faltas = await conn.query(`SELECT id,
funcionario_id,
data_falta,
horas FROM FALTAS`);
      return faltas.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getByFuncionarioId(funcionario_id: number): Promise<FaltaEntity[]> {
    try {
      const faltas = await conn.query(`SELECT id,
                funcionario_id,
                data_falta,
                horas FROM FALTAS WHERE funcionario_id = ${funcionario_id}`);
      return faltas.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(id: number, input: FaltaEntity): Promise<void> {
    try {
      await conn.query("BEGIN");

      await conn.query(`UPDATE FALTAS SET funcionario_id = ${input.props.funcionario_id},
data_falta = '${input.props.data_falta}',
horas = '${input.props.horas}' WHERE ID = ${id}`);

      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(`DELETE FROM FALTAS WHERE ID = ${id}`);
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

}
