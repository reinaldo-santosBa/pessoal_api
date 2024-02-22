import FolhaPagamentoEntity from "../../domain/entity/folha_pagamento/folha.pagamento";
import FolhaPagamentoConvenioEntity from "../../domain/entity/folha_pagamento/folha.pagamento.convenio";
import FolhaPagamentoEncargoEntity from "../../domain/entity/folha_pagamento/folha.pagamento.encargo";
import FolhaPagamentoFuncionarioEntity from "../../domain/entity/folha_pagamento/folha.pagamento.funcionario";
import FolhaPagamentoProvisaoEntity from "../../domain/entity/folha_pagamento/folha.pagamento.provisao";
import { FolhaBaseRepository } from "../../domain/repository/folha/folha.base.repository";
import { FolhaPagamentoRepository } from "../../domain/repository/folha/folha.pagamento.repository";
import { ParamsProcessarFolha, ProcessarFolhaOutput } from "../../domain/repository/processar.folha.pagamento.repository";


export type FolhaPagamentoInput = {
    folha_pagamento: ParamsProcessarFolha;
    data: ProcessarFolhaOutput[];
};

export default class FolhaPagamentoService {
  constructor(
        private readonly folhaPagamentoRepository: FolhaPagamentoRepository,
        private readonly folhaBaseRepository: FolhaBaseRepository,
  ) {}

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
                  Number(somas[funcionarioId].percentual_descontar_convenio) +
                  Number(obj.percentual_descontar_convenio);
      }
    });

    const somasArray: Partial<ProcessarFolhaOutput>[] = Object.values(somas);
    const folhaBaseResult = await this.folhaBaseRepository.getAtivo();
    const teste = {
      ano: input.folha_pagamento.ano,
      data_fechamento: input.folha_pagamento.data_fechamento,
      dias_uteis: input.folha_pagamento.dias_uteis,
      empresa_id: folhaBaseResult.empresa_id,
      folha_base_id: folhaBaseResult.id,
      mes: input.folha_pagamento.mes,
      valor_folha: 1000,
      empresa: folhaBaseResult.empresa,
    };

    const folhaPagamento = await this.folhaPagamentoRepository.insert(
      somasArray,
      teste,
    );

    //return somasArray;
  }
}
