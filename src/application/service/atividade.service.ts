import AtividadeEntity, { AtividadeProps } from "../../domain/entity/atividade";
import { AtividadeRepository } from "../../domain/repository/atividade.repository";

export default class AtividadeService {
    constructor(private readonly atividadeRepository: AtividadeRepository) { }

    async create(input: AtividadeProps) {
        const atividade = new AtividadeEntity(input);
        await this.atividadeRepository.insert(atividade);
    }

    async getAll() {
        const atividades = await this.atividadeRepository.getAll();

        return atividades;
    }

    async update(id: number, input: AtividadeProps) {

    }

    async delete(id: number) {
        await this.atividadeRepository.delete(id);
    }
}
