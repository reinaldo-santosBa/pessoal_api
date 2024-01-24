import DescontoEntity, { DescontoProps } from "../../domain/entity/desconto";
import { DescontoRepository } from "../../domain/repository/desconto.repository";
import AppError from "../errors/AppError";

export default class DescontoService {
    constructor(private readonly descontoRepository: DescontoRepository) {}

    async create(input: DescontoProps) {
        if (!input.desconto) {
            throw new AppError("Desconto Obrigatório");
        }

        const desconto = new DescontoEntity(input);
        const newDesconto = await this.descontoRepository.insert(desconto);

        return newDesconto;
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
