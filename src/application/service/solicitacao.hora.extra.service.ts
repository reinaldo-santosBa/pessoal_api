import SolicitacaoHoraExtraEntity, { SolicitacaoHoraExtraProps } from "../../domain/entity/solicitacao.hora.extra";
import { SolicitacaoHoraExtraRepository } from "../../domain/repository/solicitacao.hora.extra";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";


export default class SolicitacaoHoraExtraService {
    constructor(private readonly solicitacaoHoraExtraRepository: SolicitacaoHoraExtraRepository) {}

    async create(input: SolicitacaoHoraExtraProps) {

        const camposObrigatorios: string[] = [
            "funcionario_id",
            "solicitante_id",
            "data_solicitacao",
            "horas_extras",
        ];

        for (const campo of camposObrigatorios) {
            if (!input[campo]) {
                throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
            }
        }

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
        const camposObrigatorios: string[] = [
            "funcionario_id",
            "solicitante_id",
            "data_solicitacao",
            "horas_extras",
        ];

        for (const campo of camposObrigatorios) {
            if (!input[campo]) {
                throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
            }
        }

        const solicitacaoExisting = await this.solicitacaoHoraExtraRepository.getById(id);
        if (!solicitacaoExisting) {
            throw new AppError("Solicitação não encontrado", status.NOT_FOUND);
        }

        const solicitacaoHoraExtra = new SolicitacaoHoraExtraEntity(input);
        const updateSolicitacaoHoraExtra =
         await this.solicitacaoHoraExtraRepository.update(id,solicitacaoHoraExtra);

        return updateSolicitacaoHoraExtra;
    }


    async delete(id: number): Promise<void> {
        const solicitacaoExisting =
        await this.solicitacaoHoraExtraRepository.getById(id);
        if (!solicitacaoExisting) {
            throw new AppError("Solicitação não encontrado", status.NOT_FOUND);
        }

        await this.solicitacaoHoraExtraRepository.delete(id);
    }
}
