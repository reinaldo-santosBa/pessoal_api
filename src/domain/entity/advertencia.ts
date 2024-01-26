export type AdvertenciaProps = {
  funcionario_id: number;
  responsavel_id: number;
  advertencia: string;
  data: Date;

  [key: string]: string | number | Date;
};

export default class AdvertenciaEntity {
    public props: AdvertenciaProps;

    constructor(props: AdvertenciaProps) {
        this.props = {
            ...props
        };
    }
}
