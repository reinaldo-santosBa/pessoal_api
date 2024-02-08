export type CidadesProps = {
  id: number;
  codigo_ibge: string;
  cidade: string;
  estado_id: number;
};

export type EstadoProps = {
  id: number;
  estado: string;
  uf: string;
  regiao_id: number;
  codigo_ibge: string;
};

export type RigoesProps = {
  id: number;
  regiao: string;
}

export type BairrosProps = {
  id: number;
  cidade_id: number;
  bairro: string;
  tipo_bairro_id: number;
};


export type EnderecoProps = {
  cep: string;
  logradouro: string;
  pessoa_id: number;
  tipo_endereco_id: number;
  complemento?: string;
  numero?: string;
  tipo_logradouro_id?: number;
  bairro_id?: number;

  [key: string]: string | number;
};

export default class EnderecoEntity {
  public props: EnderecoProps;

  constructor(props: EnderecoProps) {
    this.props = {
      ...props,
    };
  }
}
