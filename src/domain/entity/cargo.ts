export type CargoProps = {
  cargo: string;
  remuneracao: number;
  comissao_direta: number;
  comissao_indireta: number;
  jornada_trabalho_id: number;
}


export default class CargoEntity {
  public props: CargoProps;

  constructor(props: CargoProps) {
    this.props = {
      ...props,
    };
  }

  public get getCargo(): string {
    return this.props.cargo;
  }
  private set setCargo(value: string) {
    this.props.cargo = value;
  }

  public get getRemuneracao(): number {
    return this.props.remuneracao;
  }
  private set setRemuneracao(value: number) {
    this.props.remuneracao = value;
  }

  public get getComissao_direta(): number {
    return this.props.comissao_direta;
  }
  private set setComissao_direta(value: number) {
    this.props.comissao_direta = value;
  }

  public get getComissao_indireta(): number {
    return this.props.comissao_indireta;
  }
  private set setComissao_indireta(value: number) {
    this.props.comissao_indireta = value;
  }

  public get getJornada_trabalho_id(): number {
    return this.props.jornada_trabalho_id;
  }
  private set setJornada_trabalho_id(value: number) {
    this.props.jornada_trabalho_id = value;
  }
}
