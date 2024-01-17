export type RateioCentroResultadoProps = {
  rateio_id: number;
  centro_resultado_id: number;
  centro_resultado: string;
  percentual: number;
}

export default class RateioCentroResultadoEntity {
    public props: RateioCentroResultadoProps;

    constructor(props: RateioCentroResultadoProps) {
        this.props = {
            ...props,
        };
    }
}
