export type AdvertenciaProps = {
  funcionario_id: number;
  reponsavel_id: number;
  advertencia: string;
  data: Date;
}

export default class AdvertenciaEntity {
    public props: AdvertenciaProps;

    constructor(props: AdvertenciaProps) {
        this.props = {
            ...props
        };
    }
}
