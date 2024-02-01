import FolhaPagamentoEncargoEntity from "../../../domain/entity/folha/folha.pagamento.encargo";
import { FolhaPagamentoEncargoRepository } from "../../../domain/repository/folha/folha.pagamento.encargo.repository";

export default class FolhaPagamentoConvenioPostgresRepository
implements FolhaPagamentoEncargoRepository
{
    async insert(
        input: FolhaPagamentoEncargoEntity,
    ): Promise<FolhaPagamentoEncargoEntity> {
        throw new Error("Method not implemented.");
    }

    async update(
        id: number,
        input: FolhaPagamentoEncargoEntity,
    ): Promise<FolhaPagamentoEncargoEntity> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async get(): Promise<FolhaPagamentoEncargoEntity[]> {
        throw new Error("Method not implemented.");
    }
}
