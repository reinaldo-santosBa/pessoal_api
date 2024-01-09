import conn from "../../infrastructure/db/config.db";

export class GeneroService {
    async find() {
        const generos = await conn.query("SELECT ID, GENERO FROM GENEROS");

        return generos;
    }
}
