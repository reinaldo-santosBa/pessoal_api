import AppError from "../../application/errors/AppError";
import * as status from "../../constraints/http.stauts";
import { ParamsProcessarFolha, ProcessarFolhaOutput, ProcessarFolhaPagamentoRepository } from "../../domain/repository/processar.folha.pagamento.repository";
import conn from "../config/database.config";

export default class ProcessarFolhaPagamentoPostgresRepository
implements ProcessarFolhaPagamentoRepository
{
  async getAll(
    params: ParamsProcessarFolha,
  ): Promise<any> {
    try {
      let whereFuncionarioId: string = "";
      if (params.funcionario_id) {
        whereFuncionarioId = `AND f.id = ${params.funcionario_id}`;
      }

      const data = await conn.query(`SELECT
  f.id as funcionario_id,
  pf.nome,
  pf.cpf,
  f.cargo_id,
  c.cargo,
  fcr.centro_resultado_id as centro_resultado_folha_id,
  fcr.centro_resultado as centro_resultado_folha,
  f.empresa_id,
  f.empresa,
  fbip.item_pcg_id,
  fbip.item_pcg,
  fbip.tipo_folha_id,
  tf.tipo_folha,
  fb.id as folha_base_id,
  rcr.centro_resultado_id as centro_resultado_rateio_id,
  rcr.centro_resultado as centro_resultado_rateio,
  (c.remuneracao * rcr.percentual) / 100 as salario_base,
  -- Subconsulta para encargos agrupados
  (SELECT jsonb_agg(
     jsonb_build_object(
       'encargo_id', fbe.encargo_id,
       'encargo_nome', e.encargo,
       'percentual_empresa', (fbe.percentual_empresa * rcr.percentual) / 100,
       'valor_encargo_empresa', (fbe.percentual_empresa * c.remuneracao) / 100 * rcr.percentual / 100,
       'percentual_funcionario', fbe.percentual_funcionario,
       'valor_encargo_funcionario', (fbe.percentual_funcionario * c.remuneracao) / 100 * rcr.percentual / 100
     )
   )
   FROM folhas_base_encargos fbe
   LEFT JOIN encargos e ON e.id = fbe.encargo_id
   WHERE fb.id = fbe.folha_base_id
   ) AS encargos,
  -- Subconsulta para provisões agrupadas
  (SELECT jsonb_agg(
     jsonb_build_object(
       'provisao_id', fbp.provisao_id,
       'nome_provisao', p.provisao,
       'percentual_provisao', fbp.percentual * rcr.percentual / 100
     )
   )
   FROM folhas_base_provisoes fbp
   INNER JOIN provisoes p ON p.id = fbp.provisao_id
   WHERE fb.id = fbp.folha_base_id
   ) AS provisoes,
  -- Subconsulta para convênios agrupados
  (SELECT jsonb_agg(
     jsonb_build_object(
       'convenio_cidade_id', cc.id,
       'convenio', cv.convenio,
       'valor_descontar_convenio', fbcc.valor_descontar * rcr.percentual / 100 * rcr.percentual / 100,
       'valor_pagar_convenio', fbcc.valor_pagar * rcr.percentual / 100 * rcr.percentual / 100,
       'percentual_descontar_convenio', fbcc.percentual_descontar * rcr.percentual / 100
     )
   )
   FROM folhas_base_convenios_cidades fbcc
   INNER JOIN convenios_cidades cc ON cc.id = fbcc.convenio_cidade_id
   INNER JOIN convenios cv ON cv.id = cc.convenio_id
   WHERE fb.id = fbcc.folha_base_id
   ) AS convenios
FROM
  funcionarios f
  INNER JOIN rateios r ON r.funcionario_id = f.id
  INNER JOIN rateios_centros_resultado rcr ON rcr.rateio_id = r.id
  INNER JOIN pessoas_fisica pf ON pf.id = f.id
  INNER JOIN funcionarios_centros_resultado fcr
    ON fcr.funcionario_id = f.id and fcr.data_fim_trabalho is null ${whereFuncionarioId}
    AND fcr.centro_resultado_id = ${params.centro_resultado_id}
  INNER JOIN cargos c ON c.id = f.cargo_id
  INNER JOIN folhas_base fb ON fb.empresa_id = f.empresa_id
  INNER JOIN folha_base_itens_pcg fbip ON fbip.folha_base_id = fb.id
  INNER JOIN tipos_folha tf ON tf.id = fbip.tipo_folha_id
WHERE
  fbip.tipo_folha_id = ${params.tipo_folha_id}
  AND fb.ativo = true;
`);

      return data.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
