export type TipoAfastamentoProps = {
  tipo_afastamento: string;
}

export default class TipoAfastamentoEntity {
    public props: TipoAfastamentoProps;

    constructor(props: TipoAfastamentoProps) {
        this.props = {
            ...props
        };
    }
}
