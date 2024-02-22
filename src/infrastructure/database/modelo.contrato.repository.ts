import AppError from "../../application/errors/AppError";
import ModeloContratoEntity from "../../domain/entity/modelo.contrato";
import { ModeloContratoRepository } from "../../domain/repository/modelo.contrato.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";


export type AllModeloContrato = {
    cargo_id: number;
    modelo: string;
    numero_modelo?: number;
    cargo: string;
};
export default class ModeloContratoPostgresRepository implements ModeloContratoRepository {
  async getById(id: number): Promise<ModeloContratoEntity> {
    try {
      const modeloContrato = await conn.query(
        `SELECT id, cargo_id, modelo, numero_modelo FROM MODELOS_CONTRATO WHERE ID = ${id}`,
      );

      return modeloContrato.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async insert(input: ModeloContratoEntity): Promise<ModeloContratoEntity> {
    try {
      await conn.query("BEGIN");
      const modeloContrato = await conn.query(
        `INSERT INTO MODELOS_CONTRATO(
                cargo_id,
                modelo,
                numero_modelo
            )VALUES (
              ${input.props.cargo_id},
              '${input.props.modelo}',
              ${input.props.numero_modelo}
            ) RETURNING *`,
      );

      await conn.query("COMMIT");

      return modeloContrato.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message);
    }
  }

  async update(
    id: number,
    input: ModeloContratoEntity,
  ): Promise<ModeloContratoEntity> {
    try {
      await conn.query("BEGIN");

      const modeloContrato = await conn.query(`UPDATE MODELOS_CONTRATO
            SET cargo_id = ${input.props.cargo_id},
                modelo = '${input.props.modelo}',
                numero_modelo = ${input.props.numero_modelo ?? null}
            WHERE ID = ${id} RETURNING *
          `);

      await conn.query("COMMIT");
      return modeloContrato.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(`DELETE FROM MODELOS_CONTRATO WHERE ID = ${id}`);
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getAll(): Promise<AllModeloContrato[]> {
    try {
      const modeloContrato = await conn.query(
        `SELECT mc.id, mc.cargo_id, mc.modelo, mc.numero_modelo , c.cargo
FROM modelos_contrato mc
inner join cargos c
on mc.cargo_id = c.id`,
      );

      return modeloContrato.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getByIdExisting(id: number): Promise<number> {
    try {
      const modeloContrato = await conn.query(
        `SELECT ID FROM MODELOS_CONTRATO WHERE ID = ${id}`,
      );

      return modeloContrato.rowCount;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
