import AppError from "../../application/errors/AppError";
import ContaBancariaEntity from "../../domain/entity/conta.bancaria";
import { ContaBancariaRepository } from "../../domain/repository/conta.bancaria.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";
export default class ContaBancariaPostgresRepository implements ContaBancariaRepository {

    async insert(input: ContaBancariaEntity): Promise<ContaBancariaEntity> {
        try {
            await conn.query("BEGIN");
            const newContaBancaria = await conn.query(`
                INSERT INTO CONTAS_BANCARIAS (
                    pessoa_id,
                    conta,
                    digito,
                    tipo_conta_id,
                    operacao,
                    numero_agencia,
                    digito_agencia,
                    codigo_banco,
                    banco
                )VALUES (
                    ${input.props.pessoa_id},
                    '${input.props.conta}',
                    '${input.props.digito}',
                    ${input.props.tipo_conta_id},
                    '${input.props.operacao}',
                    '${input.props.numero_agencia}',
                    '${input.props.digito_agencia}',
                    '${input.props.codigo_banco}',
                    '${input.props.banco}'
                ) RETURNING *`);
            await conn.query("COMMIT");
            return newContaBancaria.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async getAll(): Promise<ContaBancariaEntity[]> {
        try {
            const contasBancarias = await conn.query(`SELECT id,
                      pessoa_id,
                      conta,
                      digito,
                      tipo_conta_id,
                      operacao,
                      numero_agencia,
                      digito_agencia,
                      codigo_banco,
                      banco
              FROM CONTAS_BANCARIAS`);

            return contasBancarias.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async update(id: number, input: ContaBancariaEntity): Promise<ContaBancariaEntity> {
        try {
            await conn.query("BEGIN");
            const contaBancariaUpdate = await conn.query(
                `UPDATE CONTAS_BANCARIAS SET
                    conta = '${input.props.conta}',
                    digito = '${input.props.digito}',
                    operacao = '${input.props.operacao}',
                    numero_agencia = '${input.props.numero_agencia}',
                    digito_agencia = '${input.props.digito_agencia}',
                    codigo_banco = '${input.props.codigo_banco}',
                    banco = '${input.props.banco}'
              WHERE ID = ${id} RETURNING *`,
            );
            await conn.query("COMMIT");

            return contaBancariaUpdate.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM CONTAS_BANCARIAS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }
    }

    async getByIdPessoa(pessoa_id: number): Promise<ContaBancariaEntity[]> {
        try {
            const contasBancariasPessoa = await conn.query(
                `SELECT id,
                      pessoa_id,
                      conta,
                      digito,
                      tipo_conta_id,
                      operacao,
                      numero_agencia,
                      digito_agencia,
                      codigo_banco,
                      banco
              FROM CONTAS_BANCARIAS WHERE PESSOA_ID = ${pessoa_id}`,
            );

            return contasBancariasPessoa.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async getById(id: number): Promise<number> {
        try {
            const contaBancariaCount = await conn.query(
                `SELECT * FROM CONTAS_BANCARIAS WHERE ID = ${id}`,
            );
            return contaBancariaCount.rowCount;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
