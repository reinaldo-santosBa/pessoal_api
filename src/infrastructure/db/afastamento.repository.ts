import AppError from "../../application/errors/AppError";
import AfastamentoEntity from "../../domain/entity/afastamento";
import { AfastamentoRepository } from "../../domain/repository/afastamento.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class AfastamentoPostgresRepository implements AfastamentoRepository {

  async getById(id: number): Promise<AfastamentoEntity> {
    try {
      const afastamento = await conn.query(`SELECT
            id,
            data_afastamento,
            data_retorno,
            motivo_afastamento,
            funcionario_id,
            tipo_afastamento_id
           FROM  AFASTAMENTOS WHERE id = ${id}`);
      return afastamento.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getAll(): Promise<AfastamentoEntity[]> {
    try {
      const afastamentos = await conn.query(`SELECT
            id,
            data_afastamento,
            data_retorno,
            motivo_afastamento,
            funcionario_id,
            tipo_afastamento_id
           FROM  AFASTAMENTOS`);
      return afastamentos.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }


  async insert(input: AfastamentoEntity): Promise<AfastamentoEntity> {
    try {
      await conn.query("BEGIN");
      const afastamento = await conn.query(`INSERT INTO AFASTAMENTOS (
            data_afastamento,
            data_retorno,
            motivo_afastamento,
            funcionario_id,
            tipo_afastamento_id
          )VALUES(
            '${input.props.data_afastamento}',
            '${input.props.data_retorno ?? null}',
            '${input.props.motivo_afastamento}',
            ${input.props.funcionario_id},
            ${input.props.tipo_afastamento_id}
          ) RETURNING *`);
      await conn.query("COMMIT");
      return afastamento.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(
    id: number,
    input: AfastamentoEntity,
  ): Promise<AfastamentoEntity> {
    try {
      await conn.query("BEGIN");
      const afastamento = await conn.query(`UPDATE AFASTAMENTOS SET
                data_afastamento = '${input.props.data_afastamento}',
                data_retorno = '${input.props.data_retorno}',
                motivo_afastamento = '${input.props.motivo_afastamento}',
                tipo_afastamento_id = ${input.props.tipo_afastamento_id}
              WHERE ID = ${id} RETURNING *
          `);
      await conn.query("COMMIT");

      return afastamento.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getByIdExisting(id: number): Promise<number> {
    const afastamentoCount = await conn.query(
      `SELECT * FROM AFASTAMENTOS WHERE ID = ${id}`,
    );
    return afastamentoCount.rowCount;
  }

  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(`DELETE FROM AFASTAMENTOS WHERE ID = ${id}`);
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getByIdFuncionario(
    funcionario_id: number,
  ): Promise<AfastamentoEntity[]> {
    const afastamentos = await conn.query(`SELECT
            id,
            data_afastamento,
            data_retorno,
            motivo_afastamento,
            funcionario_id,
            tipo_afastamento_id
           FROM  AFASTAMENTOS WHERE funcionario_id = ${funcionario_id}
          `);

    return afastamentos.rows;
  }
}
