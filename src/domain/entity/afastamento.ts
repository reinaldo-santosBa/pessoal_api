export type AfastamentoProps = {
  data_afastamento: Date;
  data_retorno: Date;
  motivo_afastamento: string;
  funcionario_id: number;
  tipo_afastamento_id: number;
}

export default class AfastamentoEntity {
  public props: AfastamentoProps;

  constructor(props: AfastamentoProps) {
    this.props = {
      ...props,
    };
  }
}
