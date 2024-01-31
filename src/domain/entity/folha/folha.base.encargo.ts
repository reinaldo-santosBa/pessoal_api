export type FolhaBaseEncargoProps = {
  encargo_id: number;
  folha_base_id: number;
  percentual: number;
}

export default class FolhaBaseEncargoEntity {
    public props: FolhaBaseEncargoProps;

    constructor(props: FolhaBaseEncargoProps) {
        this.props = {
            ...props
        };
    }
}
