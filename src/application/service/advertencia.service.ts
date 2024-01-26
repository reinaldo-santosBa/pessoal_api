import AdvertenciaEntity, { AdvertenciaProps } from "../../domain/entity/advertencia";
import { AdvertenciaRepository } from "../../domain/repository/advertencia.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class AdvertenciaService {
    constructor(private readonly advertenciaRepository: AdvertenciaRepository) {}

    async create(input: AdvertenciaProps): Promise<AdvertenciaEntity> {
        const camposObrigatorios: string[] = [
            "funcionario_id",
            "responsavel_id",
            "advertencia",
            "data"
        ];

        for (const campo of camposObrigatorios) {
            if (!input[campo]) {
                throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
            }
        }

        const advertencia = new AdvertenciaEntity(input);
        const newAdvertencia = await this.advertenciaRepository.insert(advertencia);
        return newAdvertencia;
    }

    async update(id: number, input: AdvertenciaProps): Promise<AdvertenciaEntity> {
        const existingAdvertencia = await this.advertenciaRepository.getById(id);
        if (!existingAdvertencia) {
            throw new AppError("Advertencia não encontrada", status.NOT_FOUND);
        }

        const advertencia = new AdvertenciaEntity(input);

        const updateAdvertencia = await this.advertenciaRepository.update(id, advertencia);
        return updateAdvertencia;
    }

    async delete(id: number): Promise<void> {
        const existingAdvertencia = await this.advertenciaRepository.getById(id);
        if (!existingAdvertencia) {
            throw new AppError("Advertencia não encontrada", status.NOT_FOUND);
        }

        await this.advertenciaRepository.delete(id);
    }

    async getByIdFuncionario(funcionario_id: number): Promise<AdvertenciaEntity[]> {
        const advertencias = await this.advertenciaRepository.getByIdFuncionario(funcionario_id);
        return advertencias;
    }
}
