export type ConvenioProps = {
  convenio: string;
}

export default class ConvenioEntity {
  public props: ConvenioProps;

  constructor(props: ConvenioProps) {
    this.props = {
      ...props
    };
  }

  public get getConvenio(): string{
    return this.props.convenio;
  }

  private set setConvenio(value: string) {
    this.props.convenio = value;
  }
}
