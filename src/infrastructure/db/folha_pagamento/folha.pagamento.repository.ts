import AppError from "../../../application/errors/AppError";
import { FolhaPagamentoRepository, FolhaPagamentoType } from "../../../domain/repository/folha/folha.pagamento.repository";
import conn from "../../config/database.config";
import * as status from "../../../constraints/http.stauts";
export default class FolhaPagamentoPostgresRepository implements FolhaPagamentoRepository {
  async insert(input: FolhaPagamentoType): Promise<FolhaPagamentoType> {
    try {
      await conn.query("BEGIN");
      const folhaPagamento = await conn.query(`INSERT INTO folhas_pagamento (
                                empresa_id,
                                mes,
                                ano,
                                dias_uteis,
                                data_fechamento,
                                valor_folha,
                                folha_base_id
                            ) VALUES (
                        ${input.folhas_pagamento.props.empresa_id},
                        ${input.folhas_pagamento.props.mes},
                        ${input.folhas_pagamento.props.ano},
                        ${input.folhas_pagamento.props.dias_uteis},
                        '${input.folhas_pagamento.props.data_fechamento}',
                        ${input.folhas_pagamento.props.folha_base_id},
                                    ) RETURNING *`);




      /*       const folhaPagamentoFuncionario = await conn.query(
            `INSERT INTO folhas_pagamento_funcionarios (
                                folha_pagamento_id,
                                centro_resultado_id,
                                item_pcg_id,
                                funcionario_id,
                                tipo_folha_id,
                                salario_liquido
                                ) VALUES (
                                 ${input.props.folha_pagamento_id},
                                 ${input.props.centro_resultado_id},
                                 ${input.props.item_pcg_id},
                                 ${input.props.funcionario_id},
                                 ${input.props.tipo_folha_id},
                                 ${input.props.salario_liquido}
                                ) RETURNING *`,
        );
*/









      /*                             const folhaPagamentoConvenio =
                                        await conn.query(
                                            `INSERT INTO folha_pagamentos_convenios (
                folha_pagamento_funcionario_id,
                convenio_id,
                valor
                ) VALUES (
                    ${input.props.folha_pagamento_funcionario_id},
                    ${input.props.convenio_id},
                    ${input.props.valor},
                ) RETURNING *`,
                                        );
        */
      await conn.query("COMMIT");

      return folhaPagamento.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

}
