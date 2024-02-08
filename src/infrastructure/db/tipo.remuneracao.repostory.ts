import AppError from "../../application/errors/AppError";
import TipoRemuneracaoEntity from "../../domain/entity/tipo.remuneracao";
import { TipoRemuneracaoRepository } from "../../domain/repository/tipo.remuneracao.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class TipoRemuneracaoPostgresRepository implements TipoRemuneracaoRepository {

  async insert(input: TipoRemuneracaoEntity): Promise<TipoRemuneracaoEntity> {
    try {
      await conn.query("BEGIN");
      const tipoRemuneracao = await conn.query(
        `INSERT INTO tipos_remuneracao (tipo_remuneracao) VALUES('${input.props.tipo_remuneracao}') RETURNING *`,
      );
      await conn.query("COMMIT");
      return tipoRemuneracao.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getAll(): Promise<TipoRemuneracaoEntity[]> {
    try {
      const tiposRemuneracao = await conn.query("SELECT ID, TIPO_RUMUNERACAO FROM TIPOS_REMUNERACAO");
      return tiposRemuneracao.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getById(id: number): Promise<TipoRemuneracaoEntity> {
    try {
      const tipoRemuneracao = await conn.query(
        `SELECT ID, TIPO_RUMUNERACAO FROM TIPOS_REMUNERACAO WHERE ID = ${id}`,
      );
      return tipoRemuneracao.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }


  async update(id: number, input: TipoRemuneracaoEntity): Promise<TipoRemuneracaoEntity> {
    try {
      await conn.query("BEGIN");
      const tipoRemuneracao = await conn.query(
        `UPDATE TIPOS_REMUNERACAO SET TIPO_RUMUNERACAO = '${input.props.tipo_remuneracao}' WHERE ID = ${id} RETURNING *`,
      );
      await conn.query("COMMIT");
      return tipoRemuneracao.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }


  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(`DELETE FROM TIPOS_REMUNERACAO WHERE ID = ${id}`);
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

}
