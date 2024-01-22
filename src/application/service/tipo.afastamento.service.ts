import TipoAfastamentoEntity, { TipoAfastamentoProps } from "../../domain/entity/tipo.afastamento";
import { TipoAfastamentoRepository } from "../../domain/repository/tipo.afastamento.repository";
import AppError from "../errors/AppError";

export default class TipoAfastamentoService {
    constructor(
    private readonly tipoAfastamentoRepository: TipoAfastamentoRepository,
    ) {}

    async create(input: TipoAfastamentoProps): Promise<TipoAfastamentoEntity> {
        if (!input.tipo_afastamento) {
            throw new AppError("tipo afastamento obrigatório", 400);
        }

        const tipoAfastamento = new TipoAfastamentoEntity(input);
        const newTipoAfastamento =
      this.tipoAfastamentoRepository.insert(tipoAfastamento);
        return newTipoAfastamento;
    }

    async delete(id: number): Promise<void> {
        const tipoAfastamentoExisting =
        await this.tipoAfastamentoRepository.getById(id);

        if (!tipoAfastamentoExisting) {
            throw new AppError("Tipo Afastamento não encontrado", 404);
        }

        await this.tipoAfastamentoRepository.delete(id);
    }

    async update(id: number,input: TipoAfastamentoProps): Promise<TipoAfastamentoEntity> {
        if (!input.tipo_afastamento) {
            throw new AppError("tipo afastamento obrigatório", 400);
        }

        const tipoAfastamentoExisting =
             await this.tipoAfastamentoRepository.getById(id);
        if (!tipoAfastamentoExisting) {
            throw new AppError("Tipo Afastamento não encontrado", 404);
        }

        const tipoAfastamento = new TipoAfastamentoEntity(input);
        const updateTipoAfastamento = this.tipoAfastamentoRepository.update(
            id,
            tipoAfastamento,
        );
        return updateTipoAfastamento;
    }

    async getAll(): Promise<TipoAfastamentoEntity[]> {
        const tipoAfastamento = await this.tipoAfastamentoRepository.getAll();
        return tipoAfastamento;
    }
}
