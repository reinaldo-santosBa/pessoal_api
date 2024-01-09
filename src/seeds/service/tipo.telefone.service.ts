import conn from "../../infrastructure/db/config.db";

export class TipoTelefoneService {
    async find() {
        const tipoTelefone = await conn.query(
            "SELECT ID, TIPO_TELEFONE FROM TIPOS_TELEFONE",
        );

        return tipoTelefone;
    }
}
