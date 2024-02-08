export type FolhaBaseEncargoProps = {
    encargo_id: number;
    folha_base_id?: number;
    percentual_empresa: number;
    percentual_funcionario: number;

    [key: string]: number;
};

export default class FolhaBaseEncargoEntity {
  public props: FolhaBaseEncargoProps;

  constructor(props: FolhaBaseEncargoProps) {
    this.props = {
      ...props
    };
  }
}
