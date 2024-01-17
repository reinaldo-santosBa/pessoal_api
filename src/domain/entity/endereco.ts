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
}
