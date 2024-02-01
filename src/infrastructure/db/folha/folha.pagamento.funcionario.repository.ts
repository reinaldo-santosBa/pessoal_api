import FolhaPagamentoFuncionarioEntity from "../../entity/folha/folha.pagamento.funcionario";

export interface FolhaPagamentoFuncionarioRepository {
  insert(
    input: FolhaPagamentoFuncionarioEntity,
  ): Promise<FolhaPagamentoFuncionarioEntity>;
  update(
    id: number,
    input: FolhaPagamentoFuncionarioEntity,
  ): Promise<FolhaPagamentoFuncionarioEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaPagamentoFuncionarioEntity>;
}
