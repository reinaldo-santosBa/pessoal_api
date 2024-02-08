export type TipoRemuneracaoProps = {
  tipo_remuneracao: string;
}

export default class TipoRemuneracaoEntity {
  public props: TipoRemuneracaoProps;

  constructor(props: TipoRemuneracaoProps) {
    this.props = {
      ...props
    };
  }
}
