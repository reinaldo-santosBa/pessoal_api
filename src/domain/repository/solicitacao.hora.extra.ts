import SolicitacaoHoraExtraEntity from "../entity/solicitacao.hora.extra";

export type StatusOutput = {
  status_solicitacao: string;
  horas_extras: number;
  data_extra: Date;
}
export interface SolicitacaoHoraExtraRepository {
  insert(
    input: SolicitacaoHoraExtraEntity,
  ): Promise<SolicitacaoHoraExtraEntity>;
  getById(id: number): Promise<number>;
  getAllFuncionarioId(
    funcionario_id: number,
  ): Promise<SolicitacaoHoraExtraEntity[]>;
  update(
    id: number,
    input: SolicitacaoHoraExtraEntity,
  ): Promise<SolicitacaoHoraExtraEntity>;
  delete(id: number): Promise<void>;
  getStatusSolicitacao(
    funcionario_id: number,
    data_extra: Date,
  ): Promise<StatusOutput>;
}
