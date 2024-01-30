export type PessoaFisicaProps = {
  nome: string;
  cpf: string;
  carteira_trabalho?: string;
  pis?: number;
  titulo_eleitor?: string;
  zona_titulo_eleitor?: string;
  nascimento?: Date;
  nome_mae?: string;
  orgao_expeditor?: string;
  rg?: string;
  nome_pai?: string;
  naturalidade_id?: number;
  nacionalidade_id?: number;
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
}

