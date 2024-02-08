import AppError from "../../../application/errors/AppError";
import FolhaPagamentoEncargoEntity from "../../../domain/entity/folha/folha.pagamento.encargo";
import { FolhaPagamentoEncargoRepository } from "../../../domain/repository/folha/folha.pagamento.encargo.repository";
import conn from "../../config/database.config";
import * as status from "../../../constraints/http.stauts";
export default class FolhaPagamentoConvenioPostgresRepository
implements FolhaPagamentoEncargoRepository
{
  async insert(
    input: FolhaPagamentoEncargoEntity,
  ): Promise<FolhaPagamentoEncargoEntity> {
    try {
      await conn.query("BEGIN");
      const folhaPagamentoEncargo = await conn.query(
        `INSERT INTO folha_pagamentos_encargos (
                    folha_pagamento_funcionario_id,
                    encargo_id,
                    valor
              )VALUES (
                    ${input.props.folha_pagamento_funcionario_id},
                    ${input.props.encargo_id},
                    ${input.props.valor}
              ) RETURNING *`,
      );
      await conn.query("COMMIT");
      return folhaPagamentoEncargo.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(
    id: number,
    input: FolhaPagamentoEncargoEntity,
  ): Promise<FolhaPagamentoEncargoEntity> {
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

  async get(): Promise<FolhaPagamentoEncargoEntity[]> {
    try {
        
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
