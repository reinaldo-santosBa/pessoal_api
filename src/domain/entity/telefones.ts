export type TelefoneProps = {
  pessoa_id: number;
  numero: string;
  tipo_telefne_id: number;

  [key: string]: string | number;
};

export default class TelefoneEntity {
  public readonly id: number;
  public props: TelefoneProps;

  constructor(props: TelefoneProps) {
    this.props = {
      ...props,
    };
  }
  public get getPessoa_id(): number {
    return this.props.pessoa_id;
  }
  private set setPessoa_id(value: number) {
    this.props.pessoa_id = value;
  }

  public get getTipo_telefne_id(): number {
    return this.props.tipo_telefne_id;
  }
  private set setTipo_telefne_id(value: number) {
    this.props.tipo_telefne_id = value;
  }

  public get getNumero(): string {
    return this.props.numero;
  }
  private set setNumero(value: string) {
    this.props.numero = value;
  }
}
