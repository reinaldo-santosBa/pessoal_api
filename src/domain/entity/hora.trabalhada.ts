export type HoraTrabalhadaProps = {
  funcionario_id: number;
  data_trabalho: Date;
  hora_inicio_turno_1: string;
  hora_inicio_turno_2: string;
  hora_fim_turno_1: string;
  hora_fim_turno_2: string;

  [key: string]: string | number | Date;
};

export default class HoraTrabalhadaEntity {
  public props: HoraTrabalhadaProps;

  constructor(props:  HoraTrabalhadaProps) {
    this.props = {
      ...props
    };
  }
}
