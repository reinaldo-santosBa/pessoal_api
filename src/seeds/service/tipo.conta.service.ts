import conn from "../../infrastructure/db/config.db";

export class TipoContaService {
    async find() {
        const tipoConta = (await conn.query(
            "SELECT ID, TIPO_CONTA FROM TIPOS_CONTA",
        )).rows;

        return tipoConta;
    }
}
