import CargoEntity from "../../domain/entity/cargo";
import { CargoRepository } from "../../domain/repository/cargo.repository";
import conn from "../config/database.config";

export default class CargoPostgresRepository implements CargoRepository {
    async insert(input: CargoEntity): Promise<void> {
        await conn.query(`INSERT INTO CARGOS(
        CARGO,
        REMUNERACAO,
        COMISSAO_DIRETA,
        COMISSAO_INDIRETA,
        JORNADA_TRABALHO_ID
      )VALUES (
        '${input.props.cargo}',
        ${input.props.remuneracao},
        ${input.props.comissao_direta},
        ${input.props.comissao_indireta},
        ${input.props.jornada_trabalho_id},
      )`);
    }

    async getAll(): Promise<CargoEntity[]> {
        const cargos = await conn.query(`SELECT
        CARGO,
        REMUNERACAO,
        COMISSAO_DIRETA,
        COMISSAO_INDIRETA,
        JORNADA_TRABALHO_ID
      FROM CARGOS`);

        return cargos.rows;
    }

    async update(id: number, input: CargoEntity): Promise<CargoEntity> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        await conn.query(`DELETE FROM CARGOS WHERE ID = ${id}`);
    }
}
