import FolhaPagamentoConvenioEntity from "../../../domain/entity/folha/folha.pagamento.convenio";
import { FolhaPagamentoConvenioRepository } from "../../../domain/repository/folha/folha.pagamento.convenio.repository";

export default class FolhaPagamentoConvenioPostgresRepository
implements FolhaPagamentoConvenioRepository
{
    async insert(input: FolhaPagamentoConvenioEntity): Promise<FolhaPagamentoConvenioEntity> {
        throw new Error("Method not implemented.");
    }

    async update(id: number, input: FolhaPagamentoConvenioEntity,
    ): Promise<FolhaPagamentoConvenioEntity> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async get(): Promise<FolhaPagamentoConvenioEntity[]> {
        throw new Error("Method not implemented.");
    }
}
