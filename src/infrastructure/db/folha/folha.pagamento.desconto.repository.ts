import FolhaPagamentoDescontoEntity from "../../../domain/entity/folha/folha.pagamento.desconto";
import { FolhaPagamentoDescontoRepository } from "../../../domain/repository/folha/folha.pagamento.desconto.repository";

export default class FolhaPagamentoDescontoPostgresRepository
implements FolhaPagamentoDescontoRepository
{
    async insert(
        input: FolhaPagamentoDescontoEntity,
    ): Promise<FolhaPagamentoDescontoEntity> {
        throw new Error("Method not implemented.");
    }

    async update(
        id: number,
        input: FolhaPagamentoDescontoEntity,
    ): Promise<FolhaPagamentoDescontoEntity> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async get(): Promise<FolhaPagamentoDescontoEntity[]> {
        throw new Error("Method not implemented.");
    }
}
