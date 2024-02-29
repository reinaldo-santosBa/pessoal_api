import AppError from "../../../application/errors/AppError";
import * as status from "../../../constraints/http.stauts";
import FolhaPagamentoRemuneracaoEntity from "../../../domain/entity/folha_pagamento/folha.pagamento.remuneracao";
import conn from "../../config/database.config";
export default class FolhaPagamentoRemuneracaoPostgresRepository {
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

}
