import { QueryResult } from "pg";
import AppError from "../../application/errors/AppError";
import conn from "../../infrastructure/db/config.db";
import { EmailDto } from "../dto/email.dto";



interface IEmail {
  PESSOA_ID: number;
  TIPO_EMAIL_ID: number;
  EMAIL: string;
}
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

    async findByEmails(pessoa_id: number): Promise<QueryResult<IEmail[]>> {
        const emails: QueryResult<IEmail[]> = await
        conn.query(`SELECT PESSOA_ID,
                  TIPO_EMAIL_ID,
                  EMAIL FROM EMAILS WHERE PESSOA_ID = ${pessoa_id}`);

        return emails;
    }

    async delete(id: number) {
        const email = await conn.query(`SELECT ID FROM EMAILS WHERE ID = ${id}`);

        if (!email) {
            throw new AppError("E-mail não encontrado", 404);
        }

        await conn.query(`DELETE FROM EMAILS WHERE ID = ${id}`);
    }

}
