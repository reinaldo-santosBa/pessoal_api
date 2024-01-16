import AppError from "../../application/errors/AppError";
import EmailEntity from "../../domain/entity/email";
import { EmailRepository } from "../../domain/repository/email.repository";
import conn from "../config/database.config";

export default class EmailPostgresRepository implements EmailRepository {
    async insert(input: EmailEntity): Promise<EmailEntity> {
        try {
            await conn.query("BEGIN");
            const email = await conn.query(`INSERT INTO EMAILS(
        PESSOA_ID,
        TIPO_EMAIL_ID,
        EMAIL
      )VALUES(
        ${input.props.pessoa_id},
        ${input.props.tipo_email_id},
        '${input.props.email}'
      ) RETURNING *`);
            await conn.query("COMMIT");
            return email.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async getByIdPessoa(pessoa_id: number): Promise<EmailEntity[]> {
        try {
            const emails = await conn.query(
                `SELECT ID, PESSOA_ID, TIPO_EMAIL_ID, EMAIL FROM EMAILS WHERE PESSOA_ID = ${pessoa_id}`,
            );

            return emails.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async getEmailById(id: number): Promise<number> {
        const emailCount = (await conn.query(`SELECT * FROM EMAILS WHERE ID = ${id}`)).rowCount;
        return emailCount;
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM EMAILS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async update(id: number, input: EmailEntity): Promise <EmailEntity> {
        try {
            await conn.query("BEGIN");
            const emailUpdate = await conn.query(`UPDATE EMAILS
            SET TIPO_EMAIL_ID = ${input.props.tipo_email_id},
                EMAIL = '${input.props.email}'
            WHERE ID = ${id} RETURNING *`);
            await conn.query("COMMIT");
            return emailUpdate.rows[0];

        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }
}
