export type FolhaPagamentoConvenioProps = {
  folha_pagamento_funcionario_id?: number;
  convenio_id: number;
  valor: number
};

export default class FolhaPagamentoConvenioEntity {
  public props: FolhaPagamentoConvenioProps;

  constructor(props: FolhaPagamentoConvenioProps) {
    this.props = {
      ...props,
    };
  }
}
