import { QueryResult } from "pg";
import conn from "../../infrastructure/db/config.db";
import { CargoDto } from "../dto/cargo.dto";
import AppError from "../../application/errors/AppError";


interface ICargo {
  CARGO: string;
  SALARIO: number;
  COMISSAO_DIRETA: number;
  COMISSAO_INDIRETA: number;
}
export class CargoService {
    async create(props: CargoDto) {
        const cargo = await conn.query(`
        INSET INTO CARGOS(
          CARGO,
          SALARIO,
          COMISSAO_DIRETA,
          COMISSAO_INDIRETA
        ) VALUES(
          '${props.cargo}',
          ${props.salario},
          ${props.comissao_direta},
          ${props.comissao_indireta}
        )`);

        return cargo;
    }

    async find(): Promise<QueryResult<ICargo[]>> {
        const cargos: QueryResult<ICargo[]> = await conn.query(
            "SELECT CARGO, SALARIO, COMISSAO_DIRETA, COMISSAO_INDIRETA FROM CARGOS",
        );

        return cargos;
    }

    async findByCargo(cargo: string): Promise<QueryResult<ICargo>> {
        const cargoResult: QueryResult<ICargo> = await conn.query(
            `SELECT CARGO, SALARIO, COMISSAO_DIRETA, COMISSAO_INDIRETA FROM CARGOS WHERE CARGO = ${cargo}`,
        );

        return cargoResult;
    }

    async update() {}

    async delete(id: number) {
        const cargo: QueryResult<ICargo> = await conn.query(
            `SELECT ID FROM CARGOS WHERE ID = ${id}`,
        );

        if (!cargo) {
            throw new AppError("Cargo não encontrado", 404);
        }
        await conn.query(`DELETE CARGOS WHERE ID = ${id}`);

    }
}
