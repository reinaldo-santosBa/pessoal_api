export type FuncionarioConvenioProps = {
  funcionario_id: number;
  convenio_id: number;
  valor: number;
}

export default class FuncionarioConvenioEntity {
    public props: FuncionarioConvenioProps;

    constructor(props: FuncionarioConvenioProps) {
        this.props = {
            ...props
        };
    }
}
