import CustaEntity, { CustaProps } from "../../domain/entity/custa";
import { CustaRepository } from "../../domain/repository/custa.repository";
import AppError from "../errors/AppError";

export default class CustaService {

    constructor(private readonly custaRepository: CustaRepository) { }


    async create(input: CustaProps): Promise<CustaEntity> {
        const custa = new CustaEntity(input);
        const newCusta = await this.custaRepository.insert(custa);
        return newCusta;
    }


    async getAllFuncionarioId(funcionario_id: number): Promise<CustaEntity[]> {
        const custa = await this.custaRepository.getAllFuncionarioId(funcionario_id);
        return custa;
    }


    async update(id: number, input: CustaProps): Promise<CustaEntity> {
        const custaExisting = await this.custaRepository.getById(id);

        if (!custaExisting) {
            throw new AppError("Custa não encontrado");
        }

        const custa = new CustaEntity(input);
        const updateCusta = await this.custaRepository.update(id, custa);
        return updateCusta;
    }


    async delete(id: number): Promise<void> {
        const custaExisting = await this.custaRepository.getById(id);

        if (!custaExisting) {
            throw new AppError("Custa não encontrado");
        }

        await this.custaRepository.delete(id);
    }
}
