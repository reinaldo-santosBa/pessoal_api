import AppError from "../../application/errors/AppError";
import * as status from "../../constraints/http.stauts";
import { ParamsProcessarFolha, ProcessarFolhaOutput, ProcessarFolhaPagamentoRepository } from "../../domain/repository/processar.folha.pagamento.repository";
import conn from "../config/database.config";

export default class ProcessarFolhaPagamentoPostgresRepository
implements ProcessarFolhaPagamentoRepository
{
    async getAll(params: ParamsProcessarFolha): Promise<ProcessarFolhaOutput[]> {
        try {
            const data = await conn.query(`
                              select
rcr.centro_resultado_id as centro_resultado_rateio_id,
rcr.centro_resultado as centro_resultado_rateio,
f.id as funcionario_id,
pf.nome,
pf.cpf,
fcr.centro_resultado_id as centro_resultado_folha_id,
fcr.centro_resultado as centro_resultado_folha,
c.remuneracao as salario_base,
/*horas extras*/
e.encargo as encargo_nome,
(fbe.percentual_empresa * rcr.percentual) / 100 as percentual_empresa,
fbe.percentual_funcionario,
(fbe.percentual_empresa * c.remuneracao) / 100 * rcr.percentual / 100   as valor_encargo_empresa,
(fbe.percentual_funcionario * c.remuneracao) / 100 * rcr.percentual/100 as valor_encargo_funcionario,
p.provisao as nome_provisao,
fbp.percentual * rcr.percentual/100 as percentual_provisao,
/*atrasos e faltas*/
fbcc.valor_descontar * rcr.percentual/100 * rcr.percentual/100 as valor_descontar_convenio,
fbcc.valor_pagar * rcr.percentual/100 * rcr.percentual/100 as valor_pagar_convenio,
fbcc.percentual_descontar * rcr.percentual/100 as percentual_descontar_convenio,
c2.convenio
from funcionarios f
inner join rateios r on r.funcionario_id = f.id and r.ativo
inner join rateios_centros_resultado rcr on rcr.rateio_id = r.id
inner join pessoas_fisica pf on pf.id = f.id
inner join funcionarios_centros_resultado fcr on fcr.funcionario_id = f.id and fcr.centro_resultado_id = ${params.centro_resultado_id}
inner join cargos c on c.id = f.cargo_id
inner join folhas_base fb on fb.empresa_id = f.empresa_id
left join folhas_base_encargos fbe on fb.id = fbe.folha_base_id
left join encargos e on e.id = fbe.encargo_id
INNER JOIN horas_trabalhadas_funcionarios htf ON htf.funcionario_id = f.id
inner join folha_base_itens_pcg fbip  on fbip.folha_base_id = fb.id
inner join folhas_base_provisoes fbp  on fbp.folha_base_id = fb.id
inner join provisoes p on p.id = fbp.provisao_id
INNER JOIN folhas_base_convenios_cidades fbcc on fbcc.folha_base_id  = fb.id
inner join convenios_cidades cc  on cc.id  = fbcc.convenio_cidade_id
inner join convenios c2 on c2.id  = cc.convenio_id
WHERE htf.data_trabalho BETWEEN '${params.ano}-${params.mes}-01' AND '${params.data_fechamento}' and fbip.tipo_folha_id  = ${params.tipo_folha_id}
group by
centro_resultado_rateio_id,
centro_resultado_rateio,
f.id,
pf.nome,
pf.cpf,
fcr.centro_resultado_id,
fcr.centro_resultado,
salario_base,
encargo_nome,
percentual_empresa,
fbe.percentual_funcionario,
valor_encargo_empresa,
valor_encargo_funcionario,
nome_provisao,
percentual_provisao,
valor_descontar_convenio,
valor_pagar_convenio,
percentual_descontar_convenio,
rcr.percentual,
c2.convenio
            `);

            return data.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
