import FolhaPagamentoEntity from "../../entity/folha_pagamento/folha.pagamento";
import FolhaPagamentoConvenioEntity from "../../entity/folha_pagamento/folha.pagamento.convenio";
import FolhaPagamentoEncargoEntity from "../../entity/folha_pagamento/folha.pagamento.encargo";
import FolhaPagamentoFuncionarioEntity from "../../entity/folha_pagamento/folha.pagamento.funcionario";
import FolhaPagamentoProvisaoEntity from "../../entity/folha_pagamento/folha.pagamento.provisao";

/*export type FolhaPagamentoType = {
    folhas_pagamento: FolhaPagamentoEntity;
    folha_pagamentos_convenios_cidades: FolhaPagamentoConvenioEntity[];
    folha_pagamentos_encargo: FolhaPagamentoEncargoEntity[];
    folha_pagamentos_funcionarios?: FolhaPagamentoFuncionarioEntity[];
    folha_pagamentos_provisoes: FolhaPagamentoProvisaoEntity[];
};*/

export interface FolhaPagamentoRepository {
    insert(input: any, teste: any): Promise<any>;
    /*update(
    id: number,
    input: FolhaPagamentoEntity,
  ): Promise<FolhaPagamentoEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaPagamentoEntity[]>;*/
}
