export type PessoaProps = {
  ativo: boolean;
}

export default class PessoaEntity {
    public props: PessoaProps;

    constructor(props: PessoaProps) {
        this.props = {
            ...props,
        };
    }

    get getAtivo() {
        return this.props.ativo;
    }

    private set setAtivo(ativo: boolean) {
        this.props.ativo = ativo;
    }
}
