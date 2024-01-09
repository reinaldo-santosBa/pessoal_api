import conn from "../../infrastructure/db/config.db";

export class TipoBairroService {
    async find() {
        const tipoBairro = await conn.query(
            "SELECT ID, TIPO_BAIRRO FROM TIPOS_BAIRRO",
        );

        return tipoBairro;
    }
}
