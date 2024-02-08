export type DescontoProps = {
  desconto: string;
}


export default class DescontoEntity {
  public props: DescontoProps;

  constructor(props: DescontoProps) {
    this.props = {
      ...props
    };
  }
}
