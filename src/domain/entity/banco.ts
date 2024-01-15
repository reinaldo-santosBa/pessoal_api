export type BancoProps = {
  codigo: number;
  descricao: string;
}

export default class BancoEntity {
    public readonly id: number;
    public props: BancoProps;

    constructor(props: BancoProps) {
        this.props = {
            ...props,
        };
    }

    public get getCodigo(): number {
        return this.props.codigo;
    }
    private set setCodigo(value: number) {
        this.props.codigo = value;
    }

    public get getDescricao(): string {
        return this.props.descricao;
    }

    private set setDescricao(value: string) {
        this.props.descricao = value;
    }
}
