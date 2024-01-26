import AfastamentoEntity, { AfastamentoProps } from "../../domain/entity/afastamento";
import { AfastamentoRepository } from "../../domain/repository/afastamento.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
export default class AfastamentoService {
    constructor(private readonly afastamentoRepository: AfastamentoRepository) {}

    async create(input: AfastamentoProps): Promise<AfastamentoEntity> {
        const afastamento = new AfastamentoEntity(input);
        const newAfastamento = await this.afastamentoRepository.insert(afastamento);

        return newAfastamento;
    }

    async getByIdFuncionario(funcionario_id: number): Promise<AfastamentoEntity[]> {
        const afastamentos = await this.afastamentoRepository.getByIdFuncionario(funcionario_id);

        return afastamentos;
    }

    async update(id: number, input: AfastamentoProps): Promise<AfastamentoEntity> {
        const afastamentoExisting = await this.afastamentoRepository.getById(id);
        if (!afastamentoExisting) {
            throw new AppError("Afastamento não encontrado", status.NOT_FOUND);
        }

        const afastamento = new AfastamentoEntity(input);
        const updateAfastamento = await this.afastamentoRepository.update(id,afastamento);

        return updateAfastamento;
    }

    async delete(id: number): Promise<void> {
        await this.afastamentoRepository.delete(id);
    }
}
