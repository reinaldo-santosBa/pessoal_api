export type FolhaBaseProps = {
    id?: number;
    empresa_id: number;
    adiantamento: number;
    ativo: boolean
};



export default class FolhaBaseEntity {
    public props: FolhaBaseProps;

    constructor(props: FolhaBaseProps) {
        this.props = {
            ...props
        };
    }
}
