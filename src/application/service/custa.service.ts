import CustaEntity, { CustaProps } from "../../domain/entity/custa";
import { CustaRepository } from "../../domain/repository/custa.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
export default class CustaService {
  constructor(private readonly custaRepository: CustaRepository) {}

  async create(input: CustaProps): Promise<CustaEntity> {
    if (!input.data_custa) {
      throw new AppError("Data custa Obrigatório", status.BAD_REQUEST);
    }
    const custa = new CustaEntity(input);
    const newCusta = await this.custaRepository.insert(custa);
    return newCusta;
  }

  async getAllFuncionarioId(funcionario_id: number): Promise<CustaEntity[]> {
    const custa =
      await this.custaRepository.getAllFuncionarioId(funcionario_id);
    return custa;
  }

  async update(id: number, input: CustaProps): Promise<CustaEntity> {
    const custaExisting = await this.custaRepository.getByIdExisting(id);

    if (!custaExisting) {
      throw new AppError("Custa não encontrado", status.NOT_FOUND);
    }

    const custa = new CustaEntity(input);
    const updateCusta = await this.custaRepository.update(id, custa);
    return updateCusta;
  }
  async getAll(): Promise<CustaEntity[]> {
    const custas = await this.custaRepository.getAll();
    return custas;
  }

  async getById(id: number): Promise<CustaEntity>{
    const custa = await this.custaRepository.getById(id);
    return custa;
  }

  async delete(id: number): Promise<void> {
    const custaExisting = await this.custaRepository.getByIdExisting(id);

    if (!custaExisting) {
      throw new AppError("Custa não encontrado", status.NOT_FOUND);
    }

    await this.custaRepository.delete(id);
  }
}
