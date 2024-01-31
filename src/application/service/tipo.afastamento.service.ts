import TipoAfastamentoEntity, { TipoAfastamentoProps } from "../../domain/entity/tipo.afastamento";
import { TipoAfastamentoRepository } from "../../domain/repository/tipo.afastamento.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
export default class TipoAfastamentoService {
    constructor(
    private readonly tipoAfastamentoRepository: TipoAfastamentoRepository,
    ) {}

    async create(input: TipoAfastamentoProps): Promise<TipoAfastamentoEntity> {
        if (!input.tipo_afastamento) {
            throw new AppError("tipo afastamento obrigatório", status.BAD_REQUEST);
        }

        const tipoAfastamento = new TipoAfastamentoEntity(input);
        const newTipoAfastamento =
      this.tipoAfastamentoRepository.insert(tipoAfastamento);
        return newTipoAfastamento;
    }

    async delete(id: number): Promise<void> {
        const tipoAfastamentoExisting =
          await this.tipoAfastamentoRepository.getByIdExisting(id);

        if (!tipoAfastamentoExisting) {
            throw new AppError("Tipo Afastamento não encontrado", status.NOT_FOUND);
        }

        await this.tipoAfastamentoRepository.delete(id);
    }

    async update(id: number,input: TipoAfastamentoProps): Promise<TipoAfastamentoEntity> {
        if (!input.tipo_afastamento) {
            throw new AppError("tipo afastamento obrigatório", status.BAD_REQUEST);
        }

        const tipoAfastamentoExisting =
          await this.tipoAfastamentoRepository.getByIdExisting(id);
        if (!tipoAfastamentoExisting) {
            throw new AppError("Tipo Afastamento não encontrado", status.NOT_FOUND);
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


    async getById(id: number): Promise<TipoAfastamentoEntity> {
        const tipoAfastamento = await this.tipoAfastamentoRepository.getById(id);
        return tipoAfastamento;
    }
}
