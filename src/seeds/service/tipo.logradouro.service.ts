import conn from "../../infrastructure/db/config.db";

export class TipoLogradouroService {
    async find() {
        const tipoLogradouro = (await conn.query(
            "SELECT ID, SIGLA,TIPO_LOGRADOURO FROM TIPOS_LOGRADOURO",
        )).rows;

        return tipoLogradouro;
    }
}
