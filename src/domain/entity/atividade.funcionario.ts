export type AtividadeFuncionarioProps = {
  funcionario_id: number;
  atividade_id: number;
}

export default class AtividadeFuncionarioEntity {
    public props: AtividadeFuncionarioProps;

    constructor(props: AtividadeFuncionarioProps) {
        this.props = {
            ...props
        };
    }
}
