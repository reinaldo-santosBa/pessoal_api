import FolhaPagamentoDescontoEntity from "../../entity/folha/folha.pagamento.desconto";

export interface FolhaPagamentoDescontoRepository {
  insert(
    input: FolhaPagamentoDescontoEntity,
  ): Promise<FolhaPagamentoDescontoEntity>;
  update(
    id: number,
    input: FolhaPagamentoDescontoEntity,
  ): Promise<FolhaPagamentoDescontoEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaPagamentoDescontoEntity[]>;
}
