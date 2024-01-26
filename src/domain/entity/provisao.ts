export type ProvisaoProps = {
  provisao: string;
}


export default class ProvisaoEntity {
    public props: ProvisaoProps;

    constructor(props: ProvisaoProps) {
        this.props = {
            ...props
        };
    }
}
