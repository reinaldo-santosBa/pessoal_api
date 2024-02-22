import AppError from "../../application/errors/AppError";
import CargoEntity from "../../domain/entity/cargo";
import { CargoRepository } from "../../domain/repository/cargo.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";


export type CargoAtividadesType = {
    atividade: string;
    atividade_id: number;
}

export type CargoType = {
    cargo: CargoEntity,
    cargo_atividades: CargoAtividadesType[]
};

export default class CargoPostgresRepository implements CargoRepository {
  async getById(id: number): Promise<CargoEntity> {
    try {
      const cargo = await conn.query(`SELECT
        ID,
        CARGO,
        REMUNERACAO,
        COMISSAO_DIRETA,
        COMISSAO_INDIRETA,
        JORNADA_TRABALHO_ID
      FROM CARGOS WHERE ID = ${id}`);
      return cargo.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async insert(input: CargoType): Promise<CargoEntity> {
    try {
      await conn.query("BEGIN");

      const cargo = await conn.query(`INSERT INTO CARGOS(
        CARGO,
        REMUNERACAO,
        COMISSAO_DIRETA,
        COMISSAO_INDIRETA,
        JORNADA_TRABALHO_ID
      )VALUES (
        '${input.cargo.props.cargo}',
        ${input.cargo.props.remuneracao ?? null},
        ${input.cargo.props.comissao_direta ?? null},
        ${input.cargo.props.comissao_indireta ?? null},
        ${input.cargo.props.jornada_trabalho_id ?? null}
      ) RETURNING *`);

      for await (const cargo_atividade of input.cargo_atividades) {
        await conn.query(`INSERT INTO CARGOS_ATIVIDADES (
                cargo_id,
                atividade_id
            ) VALUES (
                ${cargo.rows[0].id},
                ${cargo_atividade.atividade_id}
            )`);
      }

      await conn.query("COMMIT");
      return cargo.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getAll(): Promise<CargoEntity[]> {
    try {
      await conn.query("BEGIN");
      const cargos = await conn.query(`SELECT
            ID,
        CARGO,
        REMUNERACAO,
        COMISSAO_DIRETA,
        COMISSAO_INDIRETA,
        JORNADA_TRABALHO_ID
      FROM CARGOS`);
      await conn.query("COMMIT");
      return cargos.rows;
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getByIdExisting(id: number): Promise<number> {
    const cargo = (
      await conn.query(`SELECT * FROM CARGOS WHERE ID = ${id}`)
    ).rowCount;

    return cargo;
  }

  async update(id: number, input: CargoEntity): Promise<CargoEntity> {
    try {
      await conn.query("BEGIN");

      const cargo = await conn.query(`UPDATE CARGOS
                SET CARGO = '${input.props.cargo}',
                    REMUNERACAO = ${input.props.remuneracao},
                    COMISSAO_DIRETA = ${input.props.comissao_direta},
                    COMISSAO_INDIRETA = ${input.props.comissao_indireta},
                    JORNADA_TRABALHO_ID = ${input.props.jornada_trabalho_id}
              WHERE ID = ${id} RETURNING *`);
      await conn.query("COMMIT");
      return cargo.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(`DELETE FROM CARGOS WHERE ID = ${id}`);
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
