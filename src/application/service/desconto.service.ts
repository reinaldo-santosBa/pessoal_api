import DescontoEntity, { DescontoProps } from "../../domain/entity/desconto";
import { DescontoRepository } from "../../domain/repository/desconto.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class DescontoService {
    constructor(private readonly descontoRepository: DescontoRepository) {}

    async create({ desconto }: DescontoProps): Promise<DescontoEntity> {
        if (!desconto) {
            throw new AppError("Desconto Obrigatório", status.BAD_REQUEST);
        }

        const descontoEntity = new DescontoEntity({ desconto });
        const newDesconto = await this.descontoRepository.insert(descontoEntity);

        return newDesconto;
    }

    async getById(id: number): Promise<DescontoEntity> {
        const desconto = await this.descontoRepository.getById(id);
        return desconto;
    }

    async getAll(): Promise<DescontoEntity[]> {
        const descontos = await this.descontoRepository.getAll();
        return descontos;
    }

    async update(id: number, input: DescontoProps): Promise<DescontoEntity> {
        const desconto = new DescontoEntity(input);
        const updateDesconto = await this.descontoRepository.update(id, desconto);
        return updateDesconto;
    }

    async delete(id: number): Promise<void> {
        await this.descontoRepository.delete(id);
    }
}
