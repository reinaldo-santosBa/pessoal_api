export type FolhaPagamentoProps = {
  empresa_id: number;
  mes: number;
  ano: number;
  dias_uteis: number;
  data_fechamento: Date;
  valor_folha: number;
  folha_base_id: number;
};

export default class FolhaPagamentoEntity {
  public props: FolhaPagamentoProps;

  constructor(props: FolhaPagamentoProps) {
    this.props = {
      ...props,
    };
  }
}
