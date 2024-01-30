export type EmailProps = {
  pessoa_id: number;
  tipo_email_id: number;
  email: string;
}

export default class EmailEntity {
    public readonly id: number;
    public props: EmailProps;

    constructor(props: EmailProps) {
        this.props = {
            ...props,
        };
    }
}
