import FolhaPagamentoRemuneracaoEntity from "../../entity/folha/folha.pagamento.remuneracao";

export interface FolhaPagamentoRemuneracaoRepository {
  insert(
    input: FolhaPagamentoRemuneracaoEntity,
  ): Promise<FolhaPagamentoRemuneracaoEntity>;
  update(
    id: number,
    input: FolhaPagamentoRemuneracaoEntity,
  ): Promise<FolhaPagamentoRemuneracaoEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaPagamentoRemuneracaoEntity[]>;
}
