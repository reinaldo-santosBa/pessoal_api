export type FaltaProps = {
    funcionario_id: number;
    data_falta: Date;
    horas: Date;
}

export default class FaltaEntity {
  public props: FaltaProps;

  constructor(props: FaltaProps) {
    this.props = {
      ...props
    };
  }
}
