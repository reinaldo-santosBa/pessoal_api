export type ModeloContratoProps = {
  cargo_id: number;
  modelo: string;
  numero_modelo?: number;
}


export default class ModeloContratoEntity {
    public props: ModeloContratoProps;

    constructor(props: ModeloContratoProps) {
        this.props = {
            ...props,
        };
    }
}
