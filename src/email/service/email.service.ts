import AppError from "../../application/errors/AppError";
import conn from "../../infrastructure/db/config.db";
import { EmailDto } from "../dto/email.dto";


export default class EmailService {
    async create(props: EmailDto[]) {
        try {

            for await (const email of props) {
                await conn.query(`INSERT INTO EMAILS(
                  PESSOA_ID,
                  TIPO_EMAIL_ID,
                  EMAIL
                ) VALUES(
                  ${email.pessoa_id},
                  ${email.tipo_email_id},
                  '${email.email}'
                )`);
            }

            return;
        } catch (error) {
            console.log(error);
            throw new AppError(error);
        }
    }

    async findByEmails(pessoa_id: number) {
        const emails = (await
        conn.query(`SELECT PESSOA_ID,
                  TIPO_EMAIL_ID,
                  EMAIL FROM EMAILS WHERE PESSOA_ID = ${pessoa_id}`)).rows;

        return emails;
    }

    async delete(id: number) {
        const email = (await conn.query(`SELECT ID FROM EMAILS WHERE ID = ${id}`)).rows;

        if (!email) {
            throw new AppError("E-mail não encontrado", 404);
        }

        await conn.query(`DELETE FROM EMAILS WHERE ID = ${id}`);
    }

}
