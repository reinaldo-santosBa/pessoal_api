export type ConvenioCidadeProps = {
    cidade_id: number;
    convenio_id: number;
    valor_pagar: number;
    percentual_descontar: number;
    valor_descontar: number;
}

export default class ConvenioCidadeEntity {
  public props: ConvenioCidadeProps;

  constructor(props: ConvenioCidadeProps) {
    this.props = {
      ...props
    };
  }
}
