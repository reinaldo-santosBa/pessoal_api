export type PessoaProps = {
  ativo: boolean;
}

export default class PessoaEntity {
  public props: PessoaProps;

  constructor(props: PessoaProps) {
    this.props = {
      ...props,
    };
  }
}
