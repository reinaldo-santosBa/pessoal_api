import conn from "../../infrastructure/db/config.db";
import { CargoDto } from "../dto/cargo.dto";

export class CargoService {
    async create(props: CargoDto) {
        const cargo = await conn.query(`
        INSET INTO CARGO(
          CARGO,
          SALARIO,
          COMISSAO_DIRETA,
          COMISSAO_INDIRETA
        ) VALUES(
          ${props.cargo},
          ${props.salario},
          ${props.comissao_direta},
          ${props.comissao_indireta}
        )`);


        return cargo;
    }

    async find() {}

    async update() {}

    async delete() {}
}
