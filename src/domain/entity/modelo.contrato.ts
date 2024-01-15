export type ModeloContratoProps = {
  cargo_id: number;
  modelo: string;
  numero_modelo: number;
}


export default class ModeloContratoEntity {
    public props: ModeloContratoProps;

    constructor(props: ModeloContratoProps) {
        this.props = {
            ...props,
        };
    }

    public get getCargo_id(): number {
        return this.props.cargo_id;
    }

    private set setCargo_id(value: number) {
        this.props.cargo_id = value;
    }

    public get getModelo(): string {
        return this.props.modelo;
    }

    private set setModelo(value: string) {
        this.props.modelo = value;
    }

    public get getNumero_modelo(): number{
        return this.props.numero_modelo;
    }

    private set setNumero_modelo(value: number) {
        this.props.numero_modelo = value;
    }

}
