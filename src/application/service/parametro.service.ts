import ParametroEntity, { ParametroProps } from "../../domain/entity/parametro";
import { ParametroRepository } from "../../domain/repository/parametro.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class ParametroSevice {
  constructor(private readonly parametroRepository: ParametroRepository) {}

  async create(input: ParametroProps): Promise<ParametroEntity>{
    const parametroEntity = new ParametroEntity(input);
    const parametro = await this.parametroRepository.insert(parametroEntity);
    return parametro;
  }

  async getAll(): Promise<ParametroEntity[]>{
    const parametros = await this.parametroRepository.getAll();

    if (!parametros) {
      throw new AppError("Não encontrado nenhum parametro", status.NOT_FOUND);
    }
    return parametros;
  }

  async update(input: ParametroProps): Promise<ParametroEntity>{
    const parametroEntity = new ParametroEntity(input);
    const parametro = await this.parametroRepository.update(parametroEntity);
    return parametro;
  }

  async delete(): Promise<void> {
    await this.parametroRepository.delete();
  }
}
