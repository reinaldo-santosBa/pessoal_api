export type FuncionarioCentroResultadoProps = {
  id: number;
  funcionario_id: number;
  centro_resultado_id: number;
  data_inicio_trabalho: Date;
  data_fim_trabalho?: Date;
};

export default class FuncionarioCentroResultadoEntity {
    public props: FuncionarioCentroResultadoProps;

    constructor(props: FuncionarioCentroResultadoProps) {
        this.props = {
            ...props,
        };
    }
}
