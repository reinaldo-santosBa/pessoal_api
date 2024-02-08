import ParametroEntity, { ParametroProps } from "../../domain/entity/parametro";
import { ParametroRepository } from "../../domain/repository/parametro.repository";

export default class ParametroSevice {
  constructor(private readonly parametroRepository: ParametroRepository) {}

  async create(input: ParametroProps): Promise<ParametroEntity>{
    const parametroEntity = new ParametroEntity(input);
    const parametro = await this.parametroRepository.insert(parametroEntity);
    return parametro;
  }

  async getAll(): Promise<ParametroEntity[]>{
    const parametros = await this.parametroRepository.getAll();
    return parametros;
  }

  async update(id: number, input: ParametroProps): Promise<ParametroEntity>{
    const parametroEntity = new ParametroEntity(input);
    const parametro = await this.parametroRepository.update(id, parametroEntity);
    return parametro;
  }

  async delete(id: number): Promise<void> {
    await this.parametroRepository.delete(id);
  }
}
