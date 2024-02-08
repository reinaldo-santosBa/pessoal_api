export type AtividadeProps = {
  atividade: string;
};

export default class AtividadeEntity {
  public props: AtividadeProps;

  constructor(props: AtividadeProps) {
    this.props = {
      ...props
    };
  }
}
