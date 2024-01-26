import { FuncionarioContratoEntity, FuncionarioContratoProps } from "../../domain/entity/funcionario.contrato";
import { FuncionarioContratoRepository } from "../../domain/repository/funcionario.contrato";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
export default class FuncionarioContratoService {
    constructor(
    private readonly funcionarioContratoRepository: FuncionarioContratoRepository,
    ) {}

    async create(
        input: FuncionarioContratoProps,
    ): Promise<FuncionarioContratoEntity> {
        const contrato = new FuncionarioContratoEntity(input);

        const newContrato = await this.funcionarioContratoRepository.insert(contrato);

        return newContrato;
    }

    async update(id: number, input: FuncionarioContratoProps): Promise<FuncionarioContratoEntity> {
        const existingContrato = await this.funcionarioContratoRepository.getById(id);
        if (!existingContrato) {
            throw new AppError("Contrato não encontrada", status.NOT_FOUND);
        }

        const contrato = new FuncionarioContratoEntity(input);

        const updateContrato = await this.funcionarioContratoRepository.update(
            id,
            contrato
        );
        return updateContrato;
    }


    async delete(id: number): Promise<void> {
        const existingContrato =
           await this.funcionarioContratoRepository.getById(id);
        if (!existingContrato) {
            throw new AppError("Contrato não encontrada", status.NOT_FOUND);
        }

        await this.funcionarioContratoRepository.delete(id);
    }

    async getByIdFuncionario(funcionario_id: number): Promise<FuncionarioContratoEntity[]> {
        const contratos = await this.funcionarioContratoRepository.getByIdFuncionario(funcionario_id);
        return contratos;
    }
}
