export type FolhaPagamentoConvenioProps = {
    folha_pagamento_funcionario_id?: number;
    convenio_cidade_id: number;
    valor_pago: number;
    valor_descontado: number;
};

export default class FolhaPagamentoConvenioEntity {
  public props: FolhaPagamentoConvenioProps;

  constructor(props: FolhaPagamentoConvenioProps) {
    this.props = {
      ...props,
    };
  }
}
