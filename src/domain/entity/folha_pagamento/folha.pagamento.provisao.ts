export type FolhaPagamentoProvisaoProps = {
    provisao_id: number;
    valor: number;
    folha_pagamento_funcionario_id?: number;
};

export default class FolhaPagamentoProvisaoEntity {
  public props: FolhaPagamentoProvisaoProps;
  constructor(props: FolhaPagamentoProvisaoProps) {
    this.props = {
      ...props
    };
  }
}
