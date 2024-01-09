import conn from "../../infrastructure/db/config.db";

export class NacionalidadeService {
    async find() {
        const nacionalidades = (await conn.query("SELECT ID, NACIONALIDADE FROM NACIONALIDADES")).rows;

        return nacionalidades;
    }
}
