export type RateioProps = {
  funcionario_id: number;
  ativo: boolean;
};

export default class RateioEntity {
    public props: RateioProps;

    constructor(props: RateioProps) {
        this.props = {
            ...props
        };
    }
}
