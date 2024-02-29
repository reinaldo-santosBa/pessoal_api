import AppError from "../../../application/errors/AppError";
import * as status from "../../../constraints/http.stauts";
import FolhaPagamentoDescontoEntity from "../../../domain/entity/folha_pagamento/folha.pagamento.desconto";
import conn from "../../config/database.config";

export default class FolhaPagamentoDescontoPostgresRepository
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

}
