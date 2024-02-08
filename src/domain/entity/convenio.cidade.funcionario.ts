export type ConvenioCidadeFuncionarioProps = {
  funcionario_id?: number;
  convenio_cidade_id: number;
}


export default class ConvenioCidadeFuncionarioEntity {
  public props: ConvenioCidadeFuncionarioProps;

  constructor(props: ConvenioCidadeFuncionarioProps) {
    this.props = {
      ...props
    };
  }
}
