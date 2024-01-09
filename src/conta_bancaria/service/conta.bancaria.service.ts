import AppError from "../../application/errors/AppError";
import conn from "../../infrastructure/db/config.db";
import contaBancariaDto from "../dto/conta.bancaria.dto";

export default class ContaBancariaService {
    async create(props: contaBancariaDto) {
        try {
            await conn.query("BEGIN");
            const contaBancaria = await conn.query(`INSERT INTO CONTAS_BANCARIAS(
              PESSOA_ID,
              CONTA,
              DIGITO,
              TIPO_CONTA_ID,
              OPERACAO,
              AGENCIA_ID
            )VALUES(
              ${props.pessoa_id},
              '${props.conta}',
              ${props.digito},
              ${props.tipo_conta_id},
              ${props.operacao},
              ${props.agencia_id}
            )`);
            await conn.query("COMMIT");
            return contaBancaria;
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error);
        }
    }
}
