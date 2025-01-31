export type JornadaTrabalhoProps = {
  jornada_trabalho: string;
  carga_diaria: number;
  unidade_tempo: string;
  carga_semanal: number;
  turnos: number;

    [key: string]: string | number;
};

export default class JornadaTrabalhoEntity {
  public props: JornadaTrabalhoProps;

  constructor(props: JornadaTrabalhoProps) {
    this.props = {
      ...props
    };
  }
}
