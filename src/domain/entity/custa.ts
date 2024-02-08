export type CustaProps = {
  funcionario_id: number;
  responsavel_id: number;
  produto_id?: number;
  servico_id?: number;
  data_custa: Date;
};

export default class CustaEntity {
  public props: CustaProps;

  constructor(props: CustaProps) {
    this.props = {
      ...props,
    };
  }
}
