import ConvenioEntity, { ConvenioProps } from "../../domain/entity/convenio";
import { ConvenioRepository } from "../../domain/repository/convenio.repository";
import AppError from "../errors/AppError";

export default class ConvenioService {
    constructor(private readonly convenioRepository: ConvenioRepository) {}

    async create(input: ConvenioProps): Promise<ConvenioEntity> {
        if (!input.convenio) {
            throw new AppError("convenio obrigatório",400);
        }

        const convenio = new ConvenioEntity(input);
        const newConvenio = this.convenioRepository.insert(convenio);
        return newConvenio;
    }

    async delete(id: number): Promise<void> {
        const convenioExisting =
                  await this.convenioRepository.getById(id);
        if (!convenioExisting) {
            throw new AppError("Convenio não encontrado",404);
        }

        await this.convenioRepository.delete(id);
    }

    async update(id: number, input: ConvenioProps): Promise<ConvenioEntity> {
        if (!input.convenio) {
            throw new AppError("convenio obrigatório", 400);
        }

        const convenioExisting = await this.convenioRepository.getById(id);
        if (!convenioExisting) {
            throw new AppError("Convenio não encontrado",404);
        }

        const convenio = new ConvenioEntity(input);
        const updateConvenio = this.convenioRepository.update(id, convenio);
        return updateConvenio;
    }

    async getAll(): Promise<ConvenioEntity[]> {
        const convenios = await this.convenioRepository.getAll();
        return convenios;
    }
}
