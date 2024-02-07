import AppError from "../../../application/errors/AppError";
import FolhaPagamentoEntity from "../../../domain/entity/folha/folha.pagamento";
import { FolhaPagamentoRepository } from "../../../domain/repository/folha/folha.pagamento.repository";
import conn from "../../config/database.config";
import * as status from "../../../constraints/http.stauts";
export default class FolhaPagamentoPostgresRepository implements FolhaPagamentoRepository {
    async insert(input: FolhaPagamentoEntity): Promise<FolhaPagamentoEntity> {
        try {
            await conn.query("BEGIN");
            const folhaPagamento =
              await conn.query(`INSERT INTO folhas_pagamento (
                                empresa_id,
                                mes,
                                ano,
                                dias_uteis,
                                data_fechamento,
                                valor_folha,
                                folha_base_id
                            ) VALUES (
                        ${input.props.empresa_id},
                        ${input.props.mes},
                        ${input.props.ano},
                        ${input.props.dias_uteis},
                        '${input.props.data_fechamento}',
                        ${input.props.folha_base_id},
                                    ) RETURNING *`);
            await conn.query("COMMIT");

            return folhaPagamento.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async update(id: number, input: FolhaPagamentoEntity): Promise<FolhaPagamentoEntity> {
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

    async get(): Promise<FolhaPagamentoEntity[]> {
        try {
  
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

}