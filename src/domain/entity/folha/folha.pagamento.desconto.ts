export type FolhaPagamentoDescontoProps = {
  folha_pagamento_funcionario_id: number;
  desconto_id: number;
  valor: number;
};

export default class FolhaPagamentoDescontoEntity {
  public props: FolhaPagamentoDescontoProps;

  constructor(props: FolhaPagamentoDescontoProps) {
    this.props = {
      ...props
    };
  }
}
