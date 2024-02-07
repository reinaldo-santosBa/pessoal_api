import FolhaPagamentoEntity from "../../entity/folha/folha.pagamento";

export interface FolhaPagamentoRepository {
  insert(input: FolhaPagamentoEntity): Promise<FolhaPagamentoEntity>;
  update(
    id: number,
    input: FolhaPagamentoEntity,
  ): Promise<FolhaPagamentoEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaPagamentoEntity[]>;
}
