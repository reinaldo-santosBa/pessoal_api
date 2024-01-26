import ModeloContratoEntity, { ModeloContratoProps } from "../../domain/entity/modelo.contrato";
import { ModeloContratoRepository } from "../../domain/repository/modelo.contrato.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class ModeloContratoService {
    constructor(private readonly modeloContratoRepository: ModeloContratoRepository) {}

    async create(input: ModeloContratoProps): Promise<ModeloContratoEntity> {
        if (!input.modelo) {
            throw new AppError("modelo Obrigatório", status.BAD_REQUEST);
        }
        if (!input.cargo_id) {
            throw new AppError("Cargo Obrigatório", status.BAD_REQUEST);
        }

        const modeloContrato = new ModeloContratoEntity(input);
        const newModeloContrato = this.modeloContratoRepository.insert(modeloContrato);
        return newModeloContrato;
    }

    async update(id: number, input: ModeloContratoProps): Promise<ModeloContratoEntity> {

        if (!input.modelo) {
            throw new AppError("modelo Obrigatório", status.BAD_REQUEST);
        }
        if (!input.cargo_id) {
            throw new AppError("Cargo Obrigatório", status.BAD_REQUEST);
        }

        const modeloExisting = await this.modeloContratoRepository.getById(id);
        if (!modeloExisting) {
            throw new AppError("Modelo de contrato não encontrado",status.NOT_FOUND);
        }

        const modeloContrato = new ModeloContratoEntity(input);
        const updateModeloContrato = this.modeloContratoRepository.update(id, modeloContrato);

        return updateModeloContrato;
    }


    async delete(id: number): Promise<void> {
        const modeloExisting = await this.modeloContratoRepository.getById(id);
        if (!modeloExisting) {
            throw new AppError("Modelo de contrato não encontrado",status.NOT_FOUND);
        }
        await this.modeloContratoRepository.delete(id);
    }

    async getAll(): Promise<ModeloContratoEntity[]>{
        const modelosContrato = await this.modeloContratoRepository.getAll();
        return modelosContrato;
    }
}
