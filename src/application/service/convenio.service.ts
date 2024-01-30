import ConvenioEntity, { ConvenioProps } from "../../domain/entity/convenio";
import { ConvenioRepository } from "../../domain/repository/convenio.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class ConvenioService {
    constructor(private readonly convenioRepository: ConvenioRepository) {}

    async create(input: ConvenioProps): Promise<ConvenioEntity> {
        if (!input.convenio) {
            throw new AppError("convenio obrigatório", status.BAD_REQUEST);
        }

        const convenio = new ConvenioEntity(input);
        const newConvenio = this.convenioRepository.insert(convenio);
        return newConvenio;
    }

    async delete(id: number): Promise<void> {
        const convenioExisting =
      await this.convenioRepository.getByIdVerifyExisting(id);
        if (!convenioExisting) {
            throw new AppError("Convenio não encontrado", status.NOT_FOUND);
        }

        await this.convenioRepository.delete(id);
    }

    async update(id: number, input: ConvenioProps): Promise<ConvenioEntity> {
        if (!input.convenio) {
            throw new AppError("convenio obrigatório", status.BAD_REQUEST);
        }

        const convenioExisting = await this.convenioRepository.getByIdVerifyExisting(id);
        if (!convenioExisting) {
            throw new AppError("Convenio não encontrado", status.NOT_FOUND);
        }

        const convenio = new ConvenioEntity(input);
        const updateConvenio = this.convenioRepository.update(id, convenio);
        return updateConvenio;
    }

    async getById(id: number): Promise<ConvenioEntity> {
        const convenioExisting =
                await this.convenioRepository.getByIdVerifyExisting(id);
        if (!convenioExisting) {
            throw new AppError("Convenio não encontrado", status.NOT_FOUND);
        }

        const convenio = await this.convenioRepository.getById(id);
        return convenio;
    }

    async getAll(): Promise<ConvenioEntity[]> {
        const convenios = await this.convenioRepository.getAll();
        return convenios;
    }
}
