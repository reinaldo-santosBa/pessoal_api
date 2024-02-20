import AppError from "../../../application/errors/AppError";
import FolhaPagamentoEncargoEntity from "../../../domain/entity/folha/folha.pagamento.encargo";
import conn from "../../config/database.config";
import * as status from "../../../constraints/http.stauts";
export default class FolhaPagamentoConvenioPostgresRepository

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

}
