import AppError from "../../../application/errors/AppError";
import FolhaPagamentoRemuneracaoEntity from "../../../domain/entity/folha/folha.pagamento.remuneracao";
import { FolhaPagamentoRemuneracaoRepository } from "../../../domain/repository/folha/folha.pagamento.remuneracao.repository";
import conn from "../../config/database.config";
import * as status from "../../../constraints/http.stauts";
export default class FolhaPagamentoRemuneracaoPostgresRepository implements FolhaPagamentoRemuneracaoRepository {
  async insert(input: FolhaPagamentoRemuneracaoEntity): Promise<FolhaPagamentoRemuneracaoEntity> {
    try {
      await conn.query("BEGIN");
      const folhaPagamentoRemuneracao = await conn.query(
        `INSERT INTO folha_pagamentos_remuneracoes (
                    tipo_remuneracao_id,
                    valor,
                    folha_pagamento_funcionario_id
                  ) VALUES (
                    ${input.props.tipo_remuneracao_id},
                    ${input.props.valor},
                    ${input.props.folha_pagamento_funcionario_id}
                  ) RETURNING *`,
      );
      await conn.query("COMMIT");
      return folhaPagamentoRemuneracao.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
  
  async update(id: number, input: FolhaPagamentoRemuneracaoEntity): Promise<FolhaPagamentoRemuneracaoEntity> {
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
  
  async get(): Promise<FolhaPagamentoRemuneracaoEntity[]> {
    try {
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

}