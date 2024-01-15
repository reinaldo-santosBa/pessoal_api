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

    public get getEmpresa_id(): number {
        return this.props.empresa_id;
    }

    private set setEmpresa_id(value: number) {
        this.props.empresa_id = value;
    }

    public get getCargo_id(): number {
        return this.props.cargo_id;
    }

    private set setCargo_id(value: number) {
        this.props.cargo_id = value;
    }

    public get getData_admissao(): Date {
        return this.props.data_admissao;
    }
    private set setData_admissao(value: Date) {
        this.props.data_admissao = value;
    }

    public get getAdiantamento(): boolean {
        return this.props.adiantamento;
    }
    private set setAdiantamento(value: boolean) {
        this.props.adiantamento = value;
    }
    public get getPericulosidade(): boolean {
        return this.props.periculosidade;
    }
    private set setPericulosidade(value: boolean) {
        this.props.periculosidade = value;
    }

    public get getData_demissao(): Date {
        return this.props.data_demissao;
    }
    private set setData_demissao(value: Date) {
        this.props.data_demissao = value;
    }

    public get getRegistrado(): boolean {
        return this.props.registrado;
    }
    private set setRegistrado(value: boolean) {
        this.props.registrado = value;
    }

    public get getReceber_transporte(): boolean {
        return this.props.receber_transporte;
    }

    private set setReceber_transporte(
        receber_transporte: boolean,
    ) {
        this.props.receber_transporte = receber_transporte;
    }

    public get getContribuicao_sindical(): boolean {
        return this.props.contribuicao_sindical;
    }

    private set setContribuicao_sindical(
        contribuicao_sindical: boolean,
    ) {
        this.props.contribuicao_sindical =
      contribuicao_sindical;
    }

    public get getJornada_trabalho_id(): number {
        return this.props.jornada_trabalho_id;
    }

    private set setJornada_trabalho_id(
        jornada_trabalho_id: number,
    ) {
        this.props.jornada_trabalho_id =
      jornada_trabalho_id;
    }
}
