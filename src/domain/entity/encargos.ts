export type EncargoProps = {
  encargo: string;
};

export default class EncargoEntity {
  public props: EncargoProps;

  constructor(props: EncargoProps) {
    this.props = {
      ...props,
    };
  }
}
