export type EnderecoProps = {
  cep: string;
  logradouro: string;
  pessoa_id: number;
  tipo_endereco_id: number;
  complemento?: string;
  numero?: string;
  tipo_logradouro_id: number;
  bairro_id: number;

  [key: string]: string | number;
};


export default class EnderecoEntity {
    public readonly id: number;
    public props: EnderecoProps;

    constructor(props: EnderecoProps) {
        this.props = {
            ...props,
        };
    }

    public get getCep(): string {
        return this.props.cep;
    }
    private set setCep(value: string) {
        this.props.cep = value;
    }

    public get getLogradouro(): string {
        return this.props.logradouro;
    }
    private set setLogradouro(value: string) {
        this.props.logradouro = value;
    }

    public get getPessoa_id(): number {
        return this.props.pessoa_id;
    }
    private set setPessoa_id(value: number) {
        this.props.pessoa_id = value;
    }

    public get getTipo_endereco_id(): number {
        return this.props.tipo_endereco_id;
    }
    private set setTipo_endereco_id(value: number) {
        this.props.tipo_endereco_id = value;
    }

    public get getTipo_logradouro_id(): number {
        return this.props.tipo_logradouro_id;
    }
    private set setTipo_logradouro_id(value: number) {
        this.props.tipo_logradouro_id = value;
    }

    public get getNumero(): string {
        return this.props.numero;
    }
    private set setNumero(value: string) {
        this.props.numero = value;
    }

    public get getBairro_id(): number {
        return this.props.bairro_id;
    }
    private set setBairro_id(value: number) {
        this.props.bairro_id = value;
    }

    public get getComplemento(): string {
        return this.props.complemento;
    }
    private set setComplemento(value: string) {
        this.props.complemento = value;
    }
}
