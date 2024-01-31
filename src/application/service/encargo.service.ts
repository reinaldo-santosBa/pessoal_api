import EncargoEntity, { EncargoProps } from "../../domain/entity/encargos";
import { EncargoRepository } from "../../domain/repository/encargo.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
export default class EncargoService {
    constructor(private readonly encargoRepository: EncargoRepository) {}

    async create(input: EncargoProps): Promise<EncargoEntity> {
        if (!input.encargo) {
            throw new AppError("encargo obrigatório");
        }

        const encargo = new EncargoEntity(input);
        const newEncargo = await this.encargoRepository.insert(encargo);
        return newEncargo;
    }

    async delete(id: number): Promise<void> {
        const encargoExisting =
          await this.encargoRepository.getByIdExisting(id);
        if (!encargoExisting) {
            throw new AppError("Encargo não encontrado",status.NOT_FOUND);
        }

        await this.encargoRepository.delete(id);
    }

    async getById(id: number): Promise<EncargoEntity> {
        const encargo = await this.encargoRepository.getById(id);
        return encargo;
    }

    async update(id: number, input: EncargoProps): Promise<EncargoEntity> {
        const encargoExisting =
          await this.encargoRepository.getByIdExisting(id);
        if (!encargoExisting) {
            throw new AppError("Encargo não encontrado",status.NOT_FOUND);
        }

        const encargo = new EncargoEntity(input);
        const updateEncargo = await this.encargoRepository.update(id,encargo);
        return updateEncargo;
    }

    async getAll(): Promise<EncargoEntity[]> {
        const encargos = await this.encargoRepository.getAll();
        return encargos;
    }
}
