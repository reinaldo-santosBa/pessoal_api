import AppError from "../../../application/errors/AppError";
import FolhaPagamentoConvenioEntity from "../../../domain/entity/folha/folha.pagamento.convenio";
import { FolhaPagamentoConvenioRepository } from "../../../domain/repository/folha/folha.pagamento.convenio.repository";
import conn from "../../config/database.config";
import * as status from "../../../constraints/http.stauts";

export default class FolhaPagamentoConvenioPostgresRepository
implements FolhaPagamentoConvenioRepository
{
  async insert(input: FolhaPagamentoConvenioEntity): Promise<FolhaPagamentoConvenioEntity> {
    try {
      await conn.query("BEGIN");
      const folhaPagamentoConvenio = await conn.query(
        `INSERT INTO folha_pagamentos_convenios (
                folha_pagamento_funcionario_id,
                convenio_id,
                valor
                ) VALUES (
                    ${input.props.folha_pagamento_funcionario_id},
                    ${input.props.convenio_id},
                    ${input.props.valor},
                ) RETURNING *`);
      await conn.query("COMMIT");
      return folhaPagamentoConvenio.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(id: number, input: FolhaPagamentoConvenioEntity,
  ): Promise<FolhaPagamentoConvenioEntity> {
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

  async get(): Promise<FolhaPagamentoConvenioEntity[]> {
    try {
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
