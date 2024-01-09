import conn from "../../infrastructure/db/config.db";
import AgenciaDto from "../dto/agencia.dto";

export default class AgenciaService {
    async create(props: AgenciaDto) {
        const agencia = await conn.query(`INSERT INTO AGENCIAS (
        NUMERO,
        DIGITO,
        BANCO_ID
      )VALUES(
        ${props.numero},
        ${props.digito},
        ${props.banco_id}
      )`);


        return agencia;
    }
}
