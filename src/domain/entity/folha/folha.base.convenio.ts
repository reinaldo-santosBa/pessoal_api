export type FolhaBaseConvenioProps = {
  folha_base_id : number;
  convenio_id   : number;
  percentual    : number;
};

export default class FolhaBaseConvenioEntity {
    public props: FolhaBaseConvenioProps;

    constructor(props: FolhaBaseConvenioProps) {
        this.props = {
            ...props
        };
    }
}
