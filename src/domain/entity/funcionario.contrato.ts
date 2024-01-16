export type FuncionarioContratoProps = {
  funcionario_id: number;
  contrato: string;
  contrato_principal: number;
  remuneracao: number;
  ajuda_custo: number;
  numero_contrato: string;
};

export class FuncionarioContratoEntity {
    public props: FuncionarioContratoProps;

    constructor(props: FuncionarioContratoProps) {
        this.props = {
            ...props,
        };
    }
}
