export type FolhaBaseProps = {
    id?: number;
    empresa_id: number;
    adiantamento: number;
    ativo: boolean;
    empresa: string;
};


export default class FolhaBaseEntity {
  public props: FolhaBaseProps;

  constructor(props: FolhaBaseProps) {
    this.props = {
      ...props
    };
  }
}
