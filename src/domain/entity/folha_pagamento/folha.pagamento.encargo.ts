export type FolhaPagamentoEncargoProps = {
    folha_pagamento_funcionario_id?: number;
    encargo_id: number;
    valor_empresa: number;
    valor_funcionario: number;
};

export default class FolhaPagamentoEncargoEntity {
  public props: FolhaPagamentoEncargoProps;

  constructor(props: FolhaPagamentoEncargoProps) {
    this.props = {
      ...props,
    };
  }
}
