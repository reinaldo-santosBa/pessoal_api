import AppError from "../../application/errors/AppError";
import TipoFolhaEntity from "../../domain/entity/tipo.folha";
import { TipoFolhaRepository } from "../../domain/repository/tipo.folha.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class TipoFolhaPostgresRepository implements TipoFolhaRepository {
  async getById(id: number): Promise<TipoFolhaEntity> {
    try {
      const tipos_folha = await conn.query(
        `SELECT ID, TIPO_FOLHA FROM tipos_folha WHERE ID = ${id}`,
      );
      return tipos_folha.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getByIdExisting(id: number): Promise<number> {
    try {
      const tipos_folha = await conn.query(
        `SELECT ID FROM tipos_folha WHERE ID = ${id}`,
      );
      return tipos_folha.rowCount;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async insert(input: TipoFolhaEntity): Promise<TipoFolhaEntity> {
    try {
      await conn.query("BEGIN");
      const tipo_folha = await conn.query(`
            INSERT INTO tipos_folha (
              TIPO_FOLHA
            ) VALUES(
              '${input.props.tipo_folha}'
            ) RETURNING *
          `);
      await conn.query("COMMIT");
      return tipo_folha.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }

  }

  async getAll(): Promise<TipoFolhaEntity[]> {
    try {
      const tipos_folha = await conn.query(
        "SELECT ID, TIPO_FOLHA FROM tipos_folha",
      );
      return tipos_folha.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }

  }

  async update(id: number, input: TipoFolhaEntity): Promise<TipoFolhaEntity> {
    try {
      await conn.query("BEGIN");
      const tipo_folha = await conn.query(`UPDATE tipos_folha
          SET tipo_folha = '${input.props.tipo_folha}'
          WHERE ID = ${id}
          RETURNING *
          `);
      await conn.query("COMMIT");
      return tipo_folha.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }

  }


  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(`DELETE FROM tipos_folha WHERE ID = ${id}`);
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }

  }

}
