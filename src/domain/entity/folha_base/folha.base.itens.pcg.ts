export type FolhaBaseItemPcgProps = {
    folha_base_id?: number;
    tipo_folha_id: number;
    item_pcg_id: number;
    item_pcg: string;

    [key: string]: number | string;
};

export default class FolhaBaseItemPcgEntity {
  public props: FolhaBaseItemPcgProps;

  constructor(props: FolhaBaseItemPcgProps) {
    this.props = {
      ...props,
    };
  }
}
