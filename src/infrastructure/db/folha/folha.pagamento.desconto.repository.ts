import FolhaPagamentoDescontoEntity from "../../../domain/entity/folha/folha.pagamento.desconto";
import { FolhaPagamentoDescontoRepository } from "../../../domain/repository/folha/folha.pagamento.desconto.repository";
import * as status from "../../../constraints/http.stauts";
import conn from "../../config/database.config";
import AppError from "../../../application/errors/AppError";

export default class FolhaPagamentoDescontoPostgresRepository
implements FolhaPagamentoDescontoRepository
{
    async insert(
        input: FolhaPagamentoDescontoEntity,
    ): Promise<FolhaPagamentoDescontoEntity> {
        try {
            await conn.query("BEGIN");
            const folhaPagamentoDesconto = await conn.query(
                `INSERT INTO folha_pagamentos_descontos (
                folha_pagamento_funcionario_id,
                desconto_id,
                valor
              ) VALUES (
                ${input.props.folha_pagamento_funcionario_id},
                ${input.props.desconto_id},
                ${input.props.valor}
              ) RETURNING *`,
            );
            await conn.query("COMMIT");
            return folhaPagamentoDesconto.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async update(
        id: number,
        input: FolhaPagamentoDescontoEntity,
    ): Promise<FolhaPagamentoDescontoEntity> {
        try {
            await conn.query("BEGIN");

            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");

            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async get(): Promise<FolhaPagamentoDescontoEntity[]> {
        try {
            await conn.query("BEGIN");

            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
