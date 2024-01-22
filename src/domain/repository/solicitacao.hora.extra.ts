import SolicitacaoHoraExtraEntity from "../entity/solicitacao.hora.extra";

export interface SolicitacaoHoraExtraRepository {
  insert(input: SolicitacaoHoraExtraEntity): Promise<SolicitacaoHoraExtraEntity>;
  getById(id: number): Promise<number>;
  getAllFuncionarioId(funcionario_id: number): Promise<SolicitacaoHoraExtraEntity[]>;
  update(id: number, input: SolicitacaoHoraExtraEntity): Promise<SolicitacaoHoraExtraEntity>;
  delete(id: number): Promise<void>;
}
