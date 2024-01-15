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

    public get getPessoa_id(): number {
        return this.props.pessoa_id;
    }
    private set setPessoa_id(value: number) {
        this.props.pessoa_id = value;
    }

    public get getEmail(): string {
        return this.props.email;
    }
    private set setEmail(value: string) {
        this.props.email = value;
    }

    public get getTipo_email_id(): number {
        return this.props.tipo_email_id;
    }
    private set setTipo_email_id(value: number) {
        this.props.tipo_email_id = value;
    }
}
