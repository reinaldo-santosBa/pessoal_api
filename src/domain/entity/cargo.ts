export type CargoProps = {
  cargo: string;
  remuneracao: number;
  comissao_direta: number;
  comissao_indireta: number;
  //jornada_trabalho_id: number;
}


export default class CargoEntity {
  public props: CargoProps;

  constructor(props: CargoProps) {
    this.props = {
      ...props,
    };
  }
}
