export type GeneroProps = {
  id: number;
  genero: string;
}

export type NaturalidadeProps = {
  id: number;
  naturalidade: string;
}

export type NacionalidadeProps = {
  id: number;
  nacionalidade: string;
};

export type TipoBairroProps = {
  id: number;
  tipo_bairro: string;
};

export type TipoLogradouroProps = {
  id: number;
  sigla: string;
  tipo_logradouro: string;
};

export type TipoPcdProps = {
  id: number;
  pcd: string;
};


export type EstadoCivilProps = {
  id: number;
  estado_civil: string;
};

export type TipoEmailProps = {
  id: number;
  tipo_email: string;
};

export type TipoTelefoneProps = {
  id: number;
  tipo_telefone: string;
};

export type TipoContaProps = {
  id: number;
  tipo_conta: string;
}

export type TipoEnderecoProps = {
  id: number;
  tipo_endereco: string;
}


export interface SeedsRepository {
  findAllGenero(): Promise<GeneroProps[]>;
  findAllTipoEmail(): Promise<TipoEmailProps[]>;
  findAllTipoBairro(): Promise<TipoBairroProps[]>;
  findAllTipoTelefone(): Promise<TipoTelefoneProps[]>;
  findAllEstadoCivil(): Promise<EstadoCivilProps[]>;
  findAllTipoPcd(): Promise<TipoPcdProps[]>;
  findAllTipoLogradouro(): Promise<TipoLogradouroProps[]>;
  findAllNaturalidade(): Promise<NaturalidadeProps[]>;
  findAllNacionalidade(): Promise<NacionalidadeProps[]>;
  findAllTipoConta(): Promise<TipoContaProps[]>;
  findAllTipoEndereco(): Promise<TipoEnderecoProps[]>;
}
