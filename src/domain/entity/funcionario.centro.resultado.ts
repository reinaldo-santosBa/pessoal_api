export type FuncionarioCentroProps = {
  funcionario_id: number;
  centro_resultado_id: number;
  data_inicio_trabalho: Date;
  data_fim_trabalho: Date;
};

export default class FuncionarioCentroResultadoEntity {
    public props: FuncionarioCentroProps;

    constructor(props: FuncionarioCentroProps) {
        this.props = {
            ...props
        };
    }
}
