import FolhaPagamentoEntity from "../../domain/entity/folha/folha.pagamento";
import FolhaPagamentoConvenioEntity from "../../domain/entity/folha/folha.pagamento.convenio";
import FolhaPagamentoDescontoEntity from "../../domain/entity/folha/folha.pagamento.desconto";
import FolhaPagamentoEncargoEntity from "../../domain/entity/folha/folha.pagamento.encargo";
import FolhaPagamentoFuncionarioEntity from "../../domain/entity/folha/folha.pagamento.funcionario";
import FolhaPagamentoProvisaoEntity from "../../domain/entity/folha/folha.pagamento.provisao";
import FolhaPagamentoRemuneracaoEntity from "../../domain/entity/folha/folha.pagamento.remuneracao";
import { FolhaPagamentoRepository } from "../../domain/repository/folha/folha.pagamento.repository";
import { ParamsProcessarFolha, ProcessarFolhaOutput } from "../../domain/repository/processar.folha.pagamento.repository";


export type FolhaPagamentoInput = {
    folha_pagamento: ParamsProcessarFolha;
    data: ProcessarFolhaOutput[];
};

export default class FolhaPagamentoService {
  constructor( private readonly folhaPagamentoRepository: FolhaPagamentoRepository) {}

  async create(input: FolhaPagamentoInput) {
    const somas: {
            [funcionarioId: number]: Partial<ProcessarFolhaOutput>;
        } = {};

    input.data.forEach(obj => {

      const funcionarioId = obj.funcionario_id;
      if (!somas[funcionarioId]) {
        somas[funcionarioId] = { ...obj };

      } else {
        somas[funcionarioId].salario_base =
                        Number(somas[funcionarioId].salario_base) +
                        Number(obj.salario_base);
        somas[funcionarioId].valor_encargo_empresa =
                        Number(somas[funcionarioId].valor_encargo_empresa) +
                        Number(obj.valor_encargo_empresa);
        somas[funcionarioId].valor_encargo_funcionario =
                        Number(somas[funcionarioId].valor_encargo_funcionario) +
                        Number(obj.valor_encargo_funcionario);
        somas[funcionarioId].percentual_empresa =
                        Number(somas[funcionarioId].percentual_empresa) +
                        Number(obj.percentual_empresa);
        somas[funcionarioId].percentual_provisao =
                        Number(somas[funcionarioId].percentual_provisao) +
                        Number(obj.percentual_provisao);

        somas[funcionarioId].valor_descontar_convenio =
                        Number(somas[funcionarioId].valor_descontar_convenio) +
                        Number(obj.valor_descontar_convenio);
        somas[funcionarioId].valor_pagar_convenio =
                        Number(somas[funcionarioId].valor_pagar_convenio) +
                        Number(obj.valor_pagar_convenio);
        somas[funcionarioId].percentual_descontar_convenio =
                        Number(
                          somas[funcionarioId].percentual_descontar_convenio,
                        ) + Number(obj.percentual_descontar_convenio);
      }
    });


    const somasArray: Partial<ProcessarFolhaOutput>[] =
        Object.values(somas);

    /*const folhaPagamento = await this.folhaPagamentoRepository.insert({
      folhas_pagamento: new FolhaPagamentoEntity({
        ano: input.folha_pagamento.ano,
        data_fechamento: input.folha_pagamento.data_fechamento,
        dias_uteis: input.folha_pagamento.dias_uteis,
        empresa_id: 1, //input.folha_pagamento.,
        folha_base_id: 1, //input.folha_pagamento.,
        mes: input.folha_pagamento.mes,
        valor_folha: 1000, //input.folha_pagamento.,
      }),
      folha_pagamentos_funcionarios: somasArray.map(
        funcionario => new FolhaPagamentoFuncionarioEntity({
            centro_resultado_id: funcionario.centro_resultado_folha_id,
            funcionario_id: funcionario.funcionario_id,
            item_pcg_id: ,
            salario_liquido: ,
            tipo_folha_id: ,
        }),
      ),
      folha_pagamentos_convenios_cidades: somasArray.map(convenio => new FolhaPagamentoConvenioEntity({
          convenio_id: ,
          valor: convenio.,
      }),
      ),
        folha_pagamentos_descontos: somasArray.map(desconto => new FolhaPagamentoDescontoEntity({
            desconto_id: ,
            valor: ,
      })) ,
        folha_pagamentos_encargo: somasArray.map(encargo => new FolhaPagamentoEncargoEntity({
            encargo_id:,
            valor:,
      })),
        folha_pagamentos_provisoes: somasArray.map(provisao => new FolhaPagamentoProvisaoEntity({
            provisao_id:,
            valor:,
      })),
        folha_pagamentos_remuneracoes: somasArray.map(remuneracao => new FolhaPagamentoRemuneracaoEntity({
            tipo_remuneracao_id:,
            valor: ,
      })),
    });*/

    return somasArray;
  }
}
