import TipoFolhaEntity, { TipoFolhaProps } from "../../domain/entity/tipo.folha";
import { TipoFolhaRepository } from "../../domain/repository/tipo.folha.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";



export default class TipoFolhaService {
    constructor(private readonly tipoFolhaRepository: TipoFolhaRepository) {}

    async create({ tipo_folha }: TipoFolhaProps): Promise<TipoFolhaEntity> {
        if (!tipo_folha) {
            throw new AppError("tipo_folha Obrigatório", status.BAD_REQUEST);
        }

        const tipoFolhaEntity = new TipoFolhaEntity({ tipo_folha });

        const newTipoFolha = await this.tipoFolhaRepository.insert(tipoFolhaEntity);
        return newTipoFolha;
    }

    async getAll(): Promise<TipoFolhaEntity[]> {
        const tiposFolha = await this.tipoFolhaRepository.getAll();
        return tiposFolha;
    }

    async getById(id: number): Promise<TipoFolhaEntity> {
        const tiposFolha = await this.tipoFolhaRepository.getById(id);
        return tiposFolha;
    }

    async update(
        id: number,
        { tipo_folha }: TipoFolhaProps,
    ): Promise<TipoFolhaEntity> {
        if (!tipo_folha) {
            throw new AppError("tipo_folha Obrigatório", status.BAD_REQUEST);
        }

        const tipoFolhaExisting =
      await this.tipoFolhaRepository.getByIdExisting(id);
        if (!tipoFolhaExisting) {
            throw new AppError("Tipo Folha não encontrado", status.NOT_FOUND);
        }

        const tipoFolhaEntity = new TipoFolhaEntity({ tipo_folha });

        const updateTipoFolha = await this.tipoFolhaRepository.update(
            id,
            tipoFolhaEntity,
        );
        return updateTipoFolha;
    }

    async delete(id: number): Promise<void> {
        const tipoFolhaExisting =
      await this.tipoFolhaRepository.getByIdExisting(id);
        if (!tipoFolhaExisting) {
            throw new AppError("Tipo Folha não encontrado", status.NOT_FOUND);
        }

        await this.tipoFolhaRepository.delete(id);
    }
}
