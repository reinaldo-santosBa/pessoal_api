export type PessoaFisicaProps = {
  nome: string;
  cpf: string;
  rg?: string;
  orgao_expeditor?: string;
  carteira_trabalho: string;
  pis: number;
  titulo_eleitor: string;
  zona_titulo_eleitor: string;
  nacionalidade_id?: number;
  nome_mae: string;
  nome_pai?: string;
  naturalidade_id?: number;
  nascimento: Date;
  estado_civil_id?: number;
  genero_id?: number;
  pcd_id?: number;

  [key: string]: string | number | Date;
};


export default class PessoaFisicaEntity {
    public props: PessoaFisicaProps;

    constructor(props: PessoaFisicaProps) {
        this.props = {
            ...props,
        };
    }

    public get getCPF(): string {
        return this.props.cpf;
    }
    private set setCPF(value: string) {
        this.props.cpf = value;
    }

    public get getNome(): string {
        return this.props.nome;
    }
    private set setNome(value: string) {
        this.props.nome = value;
    }

    public get getPcd_id(): number {
        return this.props.pcd_id;
    }
    private set setPcd_id(value: number) {
        this.props.pcd_id = value;
    }

    public get getCarteira_trabalho(): string {
        return this.props.carteira_trabalho;
    }
    private set setCarteira_trabalho(value: string) {
        this.props.carteira_trabalho = value;
    }

    public get getEstado_civil_id(): number {
        return this.props.estado_civil_id;
    }
    private set setEstado_civil_id(value: number) {
        this.props.estado_civil_id = value;
    }

    public get getNacionalidade_id(): number {
        return this.props.nacionalidade_id;
    }
    private set setNacionalidade_id(value: number) {
        this.props.nacionalidade_id = value;
    }
    public get getNaturalidade_id(): number {
        return this.props.naturalidade_id;
    }
    private set setNaturalidade_id(value: number) {
        this.props.naturalidade_id = value;
    }
    public get getNascimento(): Date {
        return this.props.nascimento;
    }
    private set setNascimento(nascimento: Date) {
        this.props.nascimento = nascimento;
    }

    public get getNome_pai(): string {
        return this.props.nome_pai;
    }

    private set setNome_pai(nome_pai: string) {
        this.props.nome_pai = nome_pai;
    }

    public get getNome_mae(): string {
        return this.props.nome_mae;
    }

    private set setNome_mae(nome_mae: string) {
        this.props.nome_mae = nome_mae;
    }

    public get getZona_titulo_eleitor(): string {
        return this.props.zona_titulo_eleitor;
    }

    private set setZona_titulo_eleitor(
        zona_titulo_eleitor: string,
    ) {
        this.props.zona_titulo_eleitor = zona_titulo_eleitor;
    }

    public get getOrgao_expeditor(): string {
        return this.props.orgao_expeditor;
    }

    private set setOrgao_expeditor(orgao_expeditor: string) {
        this.props.orgao_expeditor = orgao_expeditor;
    }

    public get getPis(): number {
        return this.props.pis;
    }

    private set setPis(pis: number) {
        this.props.pis = pis;
    }

    public get getRg(): string {
        return this.props.rg;
    }

    private set setRg(rg: string) {
        this.props.rg = rg;
    }

    public get getGenero_id(): number {
        return this.props.genero_id;
    }

    private set setGenero_id(genero_id: number) {
        this.props.genero_id = genero_id;
    }

    public get getTitulo_eleitor(): string {
        return this.props.titulo_eleitor;
    }

    private set setTitulo_eleitor(titulo_eleitor: string) {
        this.props.titulo_eleitor = titulo_eleitor;
    }
}

