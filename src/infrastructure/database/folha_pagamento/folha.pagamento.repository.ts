import AppError from "../../../application/errors/AppError";
import * as status from "../../../constraints/http.stauts";
import { FolhaPagamentoRepository } from "../../../domain/repository/folha/folha.pagamento.repository";
import conn from "../../config/database.config";
export default class FolhaPagamentoPostgresRepository implements FolhaPagamentoRepository {

  async insert(input: any, teste: any): Promise<any> {

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
                        ${teste.empresa_id},
                        ${teste.mes},
                        ${teste.ano},
                        ${teste.dias_uteis},
                        '${teste.data_fechamento}',
                        ${5000},
                        ${teste.folha_base_id},
                        '${teste.empresa}'
                                    ) RETURNING *`);


      for await (const data of input) {
        console.log(data);
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
          //folhaPagamentoFuncionarioOutput.push(folhaPagamentoFuncionario.rows[0]);

        for await (const encargo of input.data.encargos) {
          const folhaPagamentoEncargo = await conn.query(
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
        //folhaPagamentoEncargoOutput.push(folhaPagamentoEncargo.rows[0]);
        }


        /*   const folhaPagamentoProvisao = await conn.query(
          `INSERT INTO folha_pagamentos_provisoes (
                    provisao_id,
                    folha_pagamento_funcionario_id,
                    valor
                )VALUES (
                    ${data.provisao_id},
                    ${folhaPagamentoFuncionario.rows[0].id},
                    ${data.percentual_provisao}
                ) RETURNING *`,
        );
          //folhaPagamentoProvisaoOutput.push(folhaPagamentoProvisao.rows[0]);


        const folhaPagamentoConvenio =
                await conn.query(`INSERT INTO folha_pagamentos_convenios_cidades (
                folha_pagamento_funcionario_id,
convenio_cidade_id,
valor_pago,
valor_descontado
                ) VALUES (
                    ${folhaPagamentoFuncionario.rows[0].id},
                    ${data.convenio_cidade_id},
                    ${data.valor_pagar_convenio},
                    ${data.valor_descontar_convenio},
                ) RETURNING *`);
        // folhaPagamentoConvenioOutput.push(folhaPagamentoConvenio.rows[0]);
        */
      }

      // await conn.query("COMMIT");

      /*

      return {
        folhas_pagamento: folhaPagamento.rows[0],
        folha_pagamentos_funcionarios: folhaPagamentoFuncionarioOutput,
        folha_pagamentos_encargo: folhaPagamentoEncargoOutput,
        folha_pagamentos_convenios_cidades: folhaPagamentoConvenioOutput,
        folha_pagamentos_provisoes: folhaPagamentoProvisaoOutput
      };*/
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

}
