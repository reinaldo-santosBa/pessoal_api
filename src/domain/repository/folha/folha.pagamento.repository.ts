import FolhaPagamentoEntity from "../../entity/folha/folha.pagamento";
import FolhaPagamentoConvenioEntity from "../../entity/folha/folha.pagamento.convenio";
import FolhaPagamentoDescontoEntity from "../../entity/folha/folha.pagamento.desconto";
import FolhaPagamentoEncargoEntity from "../../entity/folha/folha.pagamento.encargo";
import FolhaPagamentoFuncionarioEntity from "../../entity/folha/folha.pagamento.funcionario";
import FolhaPagamentoProvisaoEntity from "../../entity/folha/folha.pagamento.provisao";
import FolhaPagamentoRemuneracaoEntity from "../../entity/folha/folha.pagamento.remuneracao";

export type FolhaPagamentoType = {
    folhas_pagamento: FolhaPagamentoEntity;
    folha_pagamentos_convenios_cidades: FolhaPagamentoConvenioEntity[];
    folha_pagamentos_descontos: FolhaPagamentoDescontoEntity[];
    folha_pagamentos_encargo: FolhaPagamentoEncargoEntity[];
    folha_pagamentos_funcionarios: FolhaPagamentoFuncionarioEntity[];
    folha_pagamentos_remuneracoes: FolhaPagamentoRemuneracaoEntity[];
    folha_pagamentos_provisoes: FolhaPagamentoProvisaoEntity[];
};

export interface FolhaPagamentoRepository {
    insert(input: FolhaPagamentoType): Promise<FolhaPagamentoType>;
    /*update(
    id: number,
    input: FolhaPagamentoEntity,
  ): Promise<FolhaPagamentoEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaPagamentoEntity[]>;*/
}
