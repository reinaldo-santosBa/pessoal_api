import ContaBancariaEntity, { ContaBancariaProps } from "../../domain/entity/conta.bancaria";
import { ContaBancariaRepository } from "../../domain/repository/conta.bancaria.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class ContaBancariaService {
    constructor(private readonly contaBancariaRepository: ContaBancariaRepository) {}

    async create(input: ContaBancariaProps): Promise<ContaBancariaEntity> {
        const contaBancaria = new ContaBancariaEntity(input);
        const newContaBancaria = await this.contaBancariaRepository.insert(contaBancaria);

        return newContaBancaria;
    }

    async getByIdPessoa(pessoa_id: number): Promise<ContaBancariaEntity[]> {
        const contasBancarias = await this.contaBancariaRepository.getByIdPessoa(pessoa_id);
        return contasBancarias;
    }

    async delete(id: number) {
        const contaBancariaExisting = await this.contaBancariaRepository.getById(id);
        if (!contaBancariaExisting) {
            throw new AppError("Conta Bancaria não encontrada",status.NOT_FOUND);
        }

        await this.contaBancariaRepository.delete(id);
    }

    async update(id: number, input: ContaBancariaProps): Promise<ContaBancariaEntity> {
        const contaBancariaExisting = await this.contaBancariaRepository.getById(id);
        if (!contaBancariaExisting) {
            throw new AppError("Conta Bancaria não encontrada",status.NOT_FOUND);
        }

        const contaBancaria = new ContaBancariaEntity(input);
        const updateContaBancaria = await this.contaBancariaRepository.update(id, contaBancaria);

        return updateContaBancaria;
    }
}
