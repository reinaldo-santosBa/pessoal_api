export type HoraExtraProps = {
  funcionario_id: number;
  solicitante_id: number;
  data_solicitacao: string;
  data_extra: string;
  horas_extras: number;
  observacao: string;
  autorizado_por: number;
  data_autorizacao: Date;
  status_solicitacao_id: number;

  [key: string]: string | number | Date;
};

export default class HoraExtraEntity {
  public props: HoraExtraProps;

  constructor(props: HoraExtraProps) {
    this.props = {
      ...props,
    };
  }
}
