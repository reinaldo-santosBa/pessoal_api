import AtividadeEntity, { AtividadeProps } from "../../domain/entity/atividade";
import { AtividadeRepository } from "../../domain/repository/atividade.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class AtividadeService {
    constructor(private readonly atividadeRepository: AtividadeRepository) {}

    async create(input: AtividadeProps): Promise<AtividadeEntity> {
        if (!input.atividade) {
            throw new AppError("O campo atividade é obrigatório", status.BAD_REQUEST);
        }

        const atividade = new AtividadeEntity(input);
        const newAtividade = await this.atividadeRepository.insert(atividade);

        return newAtividade;
    }

    async getAll(): Promise<AtividadeEntity[]> {
        const atividades = await this.atividadeRepository.getAll();

        return atividades;
    }

    async update(id: number, input: AtividadeProps): Promise<AtividadeEntity> {

        if (!input.atividade) {
            throw new AppError("O campo atividade é obrigatório",status.BAD_REQUEST);
        }

        const atividadeExisting = await this.atividadeRepository.findById(id);

        if (!atividadeExisting) {
            throw new AppError("Atividade não encontrada",status.NOT_FOUND);
        }

        const atividade = new AtividadeEntity(input);
        const ativdadeUpdate = await this.atividadeRepository.update(id, atividade);
        return ativdadeUpdate;
    }

    async delete(id: number): Promise<void> {
        const atividadeExisting = await this.atividadeRepository.findById(id);

        if (!atividadeExisting) {
            throw new AppError("Atividade não encontrada", status.NOT_FOUND);
        }

        await this.atividadeRepository.delete(id);
    }
}
