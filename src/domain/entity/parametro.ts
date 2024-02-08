export type ParametroProps = {
  centro_resultado: number;
  limite_hora_extra_diario: number;
  limite_hora_extra_mensal: number
};


export default class ParametroEntity {
  public props: ParametroProps;

  constructor(props: ParametroProps) {
    this.props = {
      ...props
    };
  }
}
