export type FolhaBaseConvenioCidadeProps = {
    folha_base_id?: number;
    convenio_cidade_id   : number;
    percentual_descontar: number;
    valor_pagar: number;
    valor_descontar: number;
};

export default class FolhaBaseConvenioCidadeEntity {
    public props: FolhaBaseConvenioCidadeProps;

    constructor(props: FolhaBaseConvenioCidadeProps) {
        this.props = {
            ...props,
        };
    }
}
