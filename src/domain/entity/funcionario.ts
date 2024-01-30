export type FuncionarioProps = {
  empresa_id: number;
  cargo_id: number;
  data_admissao: Date;
  data_demissao?: Date;
  adiantamento: boolean;
  periculosidade: boolean;
  receber_transporte: boolean;
  contribuicao_sindical: boolean;
  jornada_trabalho_id?: number;
  registrado: boolean;

  [key: string]: string | number | boolean | Date;
};

export default class FuncionarioEntity {
    public readonly id: number;
    public props: FuncionarioProps;
    constructor(props: FuncionarioProps) {
        this.props = {
            ...props,
        };
    }
}
