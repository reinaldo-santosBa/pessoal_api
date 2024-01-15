export type AgenciaProps = {
  numero: string;
  digito: string;
  banco_id: number;
}

export default class Agencia {
    public readonly id: number;
    public props: AgenciaProps;

    constructor(props: AgenciaProps) {
        this.props = {
            ...props,
        };
    }

    public get getNumero(): string {
        return this.props.numero;
    }

    private setNumero(value: string) {
        this.props.numero = value;
    }

    public get getDigito(): string {
        return this.props.digito;
    }

    private setDigito(value: string) {
        this.props.digito = value;
    }

    public get getBanco_id(): number {
        return this.props.banco_id;
    }

    private setBanco_id(value: number) {
        this.props.banco_id = value;
    }
}
