export type HoraExtraProps = {
<<<<<<< HEAD
  funcionario_id: number;
  solicitante_id: number;
  data_solicitacao: string;
  data_extra: string;
  horas_extras: number;
  observacao: string;
  autorizado_por: number;
  data_autorizacao: Date;
  status_solicitacao_id: number;
=======
    funcionario_id: number;
    solicitante_id: number;
    data_solicitacao: Date;
    data_extra: Date;
    horas_extras: number;
    observacao: string;
    autorizado_por?: number;
    data_autorizacao?: Date;
    status_solicitacao_id: number;
    id_hora_extra?: number;
>>>>>>> 9fda38ade637aced2283321a7f956d9518009173

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
