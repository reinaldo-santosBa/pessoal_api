import FolhaPagamentoConvenioEntity from "../../entity/folha/folha.pagamento.convenio";

export interface FolhaPagamentoConvenioRepository {
  insert(
    input: FolhaPagamentoConvenioEntity,
  ): Promise<FolhaPagamentoConvenioEntity>;
  update(
    id: number,
    input: FolhaPagamentoConvenioEntity,
  ): Promise<FolhaPagamentoConvenioEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaPagamentoConvenioEntity[]>;
}
