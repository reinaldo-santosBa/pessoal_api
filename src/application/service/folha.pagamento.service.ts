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

    /*  const somas: {
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
      }
    });

    const somasArray: Partial<ProcessarFolhaOutput>[] = Object.values(somas);

    return somasArray;*/

    /*    const folhaBaseResult = await this.folhaBaseRepository.getAtivo();
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
      input.data,
      teste,
    );

    //return somasArray;*/
  }
}
