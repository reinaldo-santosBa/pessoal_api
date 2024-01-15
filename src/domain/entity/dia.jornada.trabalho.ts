export type DiaJornadaTrabalhoProps = {
  dia: number;
  hora_inicio_turno_1: Date;
  hora_inicio_turno_2: Date;
  hora_fim_turno_1: Date;
  hora_fim_turno_2: Date;
  jornada_trabalho_id: number;
};


export default class DiaJornadaTrabalhoEntity {
    public props: DiaJornadaTrabalhoProps;

    constructor(props: DiaJornadaTrabalhoProps) {
        this.props = {
            ...props
        };
    }
}
