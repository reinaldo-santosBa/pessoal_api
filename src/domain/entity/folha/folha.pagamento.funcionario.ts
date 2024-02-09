export type FolhaPagamentoFuncionarioProps = {
  folha_pagamento_id?: number;
  centro_resultado_id: number;
  item_pcg_id: number;
  tipo_folha_id: number;
  funcionario_id: number;
  salario_liquido: number;
};

export default class FolhaPagamentoFuncionarioEntity {
  public props: FolhaPagamentoFuncionarioProps;

  constructor(props: FolhaPagamentoFuncionarioProps) {
    this.props = {
      ...props,
    };
  }
}
