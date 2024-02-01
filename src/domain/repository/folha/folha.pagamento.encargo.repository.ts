import FolhaPagamentoEncargoEntity from "../../entity/folha/folha.pagamento.encargo";

export interface FolhaPagamentoEncargoRepository {
  insert(
    input: FolhaPagamentoEncargoEntity,
  ): Promise<FolhaPagamentoEncargoEntity>;
  update(
    id: number,
    input: FolhaPagamentoEncargoEntity,
  ): Promise<FolhaPagamentoEncargoEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaPagamentoEncargoEntity[]>;
}
