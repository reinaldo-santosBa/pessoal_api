export type FolhaBaseProvisaoProps = {
  folha_base_id?: number;
  provisao_id: number;
  percentual: number
};

export default class FolhaBaseProvisaoEntity {
    public props: FolhaBaseProvisaoProps;

    constructor(props: FolhaBaseProvisaoProps) {
        this.props = {
            ...props,
        };
    }
}
