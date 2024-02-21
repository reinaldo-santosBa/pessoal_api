import FaltaEntity, { FaltaProps } from "../../domain/entity/falta";
import { FaltaRepository } from "../../domain/repository/falta.repository";

export default class FaltaService {
  constructor(private readonly faltaRepository: FaltaRepository) {}

  async create(input: FaltaProps): Promise<FaltaEntity> {
    const faltaEntity = new FaltaEntity(input);
    const falta = await this.faltaRepository.insert(faltaEntity);
    return falta;
  }

  async getAll(): Promise<FaltaEntity[]> {
    return await this.faltaRepository.getAll();
  }

  async getByFuncionarioId(funcionario_id: number): Promise<FaltaEntity[]> {
    return await this.faltaRepository.getByFuncionarioId(funcionario_id);
  }

  async update(id: number, input: FaltaProps): Promise<void> {
    const faltaEntity = new FaltaEntity(input);
    await this.faltaRepository.update(id, faltaEntity);
  }

  async delete(id: number): Promise<void> {
    await this.faltaRepository.delete(id);
  }

  async getById(id: number) {
    return await this.faltaRepository.getById(id);
  }
}
