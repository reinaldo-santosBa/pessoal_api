import AppError from "../../../application/errors/AppError";
import * as status from "../../../constraints/http.stauts";
import { FolhaPagamentoRepository, inputFolhaPagamento } from "../../../domain/repository/folha/folha.pagamento.repository";
import conn from "../../config/database.config";

export default class FolhaPagamentoPostgresRepository implements FolhaPagamentoRepository {
  async insert({folha_pagamento, funcionarios}: inputFolhaPagamento): Promise<void> {
    try {
      await conn.query("BEGIN");

      const folhaPagamento = await conn.query(`INSERT INTO folhas_pagamento (
                                empresa_id,
                                mes,
                                ano,
                                dias_uteis,
                                data_fechamento,
                                valor_folha,
                                folha_base_id,
                                empresa
                            ) VALUES (
                        ${folha_pagamento.empresa_id},
                        ${folha_pagamento.mes},
                        ${folha_pagamento.ano},
                        ${folha_pagamento.dias_uteis},
                        '${folha_pagamento.data_fechamento}',
                        ${folha_pagamento.valor_folha},
                        ${folha_pagamento.folha_base_id},
                        '${folha_pagamento.empresa}'
                                    ) RETURNING *`);

      for await (const data of funcionarios) {
        const folhaPagamentoFuncionario = await conn.query(
          `INSERT INTO folhas_pagamento_funcionarios (
                                folha_pagamento_id,
                                centro_resultado_id,
                                item_pcg_id,
                                funcionario_id,
                                tipo_folha_id,
                                salario_base,
                                horas_extras,
                                atrasos,
                                salario_liquido
                                ) VALUES (
                                ${folhaPagamento.rows[0].id},
                                 ${data.centro_resultado_folha_id},
                                 ${data.item_pcg_id},
                                 ${data.funcionario_id},
                                 ${data.tipo_folha_id},
                                 ${data.salario_base},
                                 100,
                                 100,
                                 100
                                ) RETURNING *`,
        );

        if (data.encargos) {
          for await (const encargo of data.encargos) {
            await conn.query(
              `INSERT INTO folha_pagamentos_encargos (
                    folha_pagamento_funcionario_id,
                    encargo_id,
                    valor_empresa,
                    valor_funcionario
                )VALUES (
                    ${folhaPagamentoFuncionario.rows[0].id},
                    ${encargo.encargo_id},
                    ${encargo.valor_encargo_empresa},
                    ${encargo.valor_encargo_funcionario}
                ) RETURNING *`,
            );
          }
        }

        if (data.provisoes) {
          for await (const provisao of data.provisoes) {
            await conn.query(
              `INSERT INTO folha_pagamentos_provisoes (
                    provisao_id,
                    folha_pagamento_funcionario_id,
                    valor
                )VALUES (
                    ${provisao.provisao_id},
                    ${folhaPagamentoFuncionario.rows[0].id},
                    ${provisao.percentual_provisao}
                ) RETURNING *`,
            );
          }
        }


        if (data.convenios) {
          for await (const convenio of data.convenios) {
            await conn.query(`INSERT INTO folha_pagamentos_convenios_cidades (
                folha_pagamento_funcionario_id,
                convenio_cidade_id,
                valor_pago,
                valor_descontado
                ) VALUES (
                    ${folhaPagamentoFuncionario.rows[0].id},
                    ${convenio.convenio_cidade_id},
                    ${convenio.valor_pagar_convenio},
                    ${convenio.valor_descontar_convenio}
                ) RETURNING *`);
          }
        }

      }

      await conn.query("COMMIT");

    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
