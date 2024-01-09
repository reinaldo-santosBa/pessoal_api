import conn from "../../infrastructure/db/config.db";

export class TipoEmailService {
    async find() {
        const tipoEmail = (await conn.query(
            "SELECT ID, TIPO_EMAIL FROM TIPOS_EMAIL",
        )).rows;

        return tipoEmail;
    }
}
