export type TipoFolhaProps = {
  tipo_folha: string;
}

export default class TipoFolhaEntity {
  public props: TipoFolhaProps;


  constructor(props: TipoFolhaProps) {
    this.props = {
      ...props
    };
  }
}
