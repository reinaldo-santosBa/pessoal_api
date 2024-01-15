import EmailEntity from "../../domain/entity/email";
import { EmailRepository } from "../../domain/repository/email.repository";
import conn from "../config/database.config";

export default class EmailPostgresRepository implements EmailRepository {
    async insert(input: EmailEntity): Promise<void> {
        await conn.query(`INSERT INTO EMAILS(
        PESSOA_ID,
        TIPO_EMAIL_ID,
        EMAIL
      )VALUES(
        ${input.props.pessoa_id},
        ${input.props.tipo_email_id},
        ${input.props.email}
      )`);
    }

    async getByIdPessoa(pessoa_id: number): Promise<void> {
        await conn.query(
            `SELECT PESSOA_ID, TIPO_EMAIL_ID, EMAIL FROM EMAILS WHERE PESSOA_ID = ${pessoa_id}`,
        );
    }

    async delete(id: number): Promise<void> {
        await conn.query(`DELETE FROM EMAILS WHERE ID = ${id}`);
    }

    async update(id: number, input: EmailEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
