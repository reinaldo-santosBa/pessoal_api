import SolicitacaoHoraExtraEntity, { SolicitacaoHoraExtraProps } from "../../domain/entity/solicitacao.hora.extra";
import { SolicitacaoHoraExtraRepository } from "../../domain/repository/solicitacao.hora.extra";

export default class SolicitacaoHoraExtraService {
    constructor(
    private readonly solicitacaoHoraExtraRepository: SolicitacaoHoraExtraRepository) {}

    async create(input: SolicitacaoHoraExtraProps) {
        const solicitacaoHoraExtra = new SolicitacaoHoraExtraEntity(input);
        const newSolicitacaoHoraExtra =
        await this.solicitacaoHoraExtraRepository.insert(solicitacaoHoraExtra);

        return newSolicitacaoHoraExtra;
    }

    async getAllFuncionarioId(funcionario_id: number): Promise<SolicitacaoHoraExtraEntity[]> {
        const solicitacoesHorasExtras =
        await this.solicitacaoHoraExtraRepository.getAllFuncionarioId(funcionario_id);
        return solicitacoesHorasExtras;
    }

    async update(id: number, input: SolicitacaoHoraExtraProps): Promise<SolicitacaoHoraExtraEntity> {
        const solicitacaoHoraExtra = new SolicitacaoHoraExtraEntity(input);
        const updateSolicitacaoHoraExtra =
         await this.solicitacaoHoraExtraRepository.update(id,solicitacaoHoraExtra);

        return updateSolicitacaoHoraExtra;
    }


    async delete(id: number): Promise<void> {
        await this.solicitacaoHoraExtraRepository.delete(id);
    }
}
