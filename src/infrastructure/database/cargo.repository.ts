import AppError from "../../application/errors/AppError";
import CargoEntity from "../../domain/entity/cargo";
import { AllCargo, CargoRepository } from "../../domain/repository/cargo.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";
import { CargoType } from "../../application/service/cargos.service";


export type CargoAtividadesType = {
    id?: number;
    cargo_id?: number;
    atividade_id: number;
    atividade?: string;
};

export type CargoTypeInput = {
    cargo: CargoEntity,
    cargo_atividades: CargoAtividadesType[]
};


export default class CargoPostgresRepository implements CargoRepository {
  async getById(id: number): Promise<CargoType> {
    try {
      const cargo = await conn.query(`SELECT
        ID,
        CARGO,
        REMUNERACAO,
        COMISSAO_DIRETA,
        COMISSAO_INDIRETA,
        JORNADA_TRABALHO_ID
      FROM CARGOS WHERE ID = ${id}`);

      const atividades_cargos = await conn.query(`
            select ca.id,
      		ca.cargo_id,
      		ca.atividade_id,
      		a.atividade
      from cargos_atividades ca
      inner join atividades a
      on ca.atividade_id = a.id
      inner join cargos c
      on c.id = ca.cargo_id
      where c.id  = ${id}
    `);
      return {
        cargo: cargo.rows[0],
        cargo_atividades: atividades_cargos.rows,
      };
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async insert(input: CargoTypeInput): Promise<CargoEntity> {
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

  async getAll(): Promise<AllCargo[]> {
    try {
      await conn.query("BEGIN");
      const cargos = await conn.query(`SELECT
        c.ID,
        c.CARGO,
        c.REMUNERACAO,
        c.COMISSAO_DIRETA,
        c.COMISSAO_INDIRETA,
        c.JORNADA_TRABALHO_ID,
        jt.jornada_trabalho
      FROM CARGOS c
      inner join jornadas_trabalho jt
      on jt.id = c.jornada_trabalho_id`);
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
