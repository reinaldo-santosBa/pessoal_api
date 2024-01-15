export type ContaBancariaProps = {
  pessoa_id: number;
  conta: string;
  digito: string;
  tipo_conta_id: number;
  operacao: string;
  agencia_id: number;

  [key: string]: string | number;
};

export default class ContaBancariaEntity {
    public readonly id: number;
    public props: ContaBancariaProps;

    constructor(props: ContaBancariaProps) {
        this.props = {
            ...props,
        };
    }

    public get getTipo_conta_id(): number {
        return this.props.tipo_conta_id;
    }
    private set setTipo_conta_id(value: number) {
        this.props.tipo_conta_id = value;
    }

    public get getOperacao(): string {
        return this.props.operacao;
    }
    private set setOperacao(value: string) {
        this.props.operacao = value;
    }

    public get getAgencia_id(): number {
        return this.props.agencia_id;
    }
    private set setAgencia_id(value: number) {
        this.props.agencia_id = value;
    }

    public get getDigito(): string{
        return this.props.digito;
    }
    private set setDigito(value: string) {
        this.props.digito = value;
    }

    public get getPessoa_id(): number {
        return this.props.pessoa_id;
    }
    private set setPessoa_id(value: number) {
        this.props.pessoa_id = value;
    }

    public get getConta(): string {
        return this.props.conta;
    }
    private set setConta(value: string) {
        this.props.conta = value;
    }
}
