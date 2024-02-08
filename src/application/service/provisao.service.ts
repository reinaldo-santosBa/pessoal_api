import ProvisaoEntity, { ProvisaoProps } from "../../domain/entity/provisao";
import { ProvisaoRepository } from "../../domain/repository/provisao.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class ProvisaoService {
  constructor(private readonly provisaoRepository: ProvisaoRepository) {}

  async create(input: ProvisaoProps): Promise<ProvisaoEntity> {
    if (!input.provisao) {
      throw new AppError("Provisao Obrigatório", status.BAD_REQUEST);
    }

    const provisao = new ProvisaoEntity(input);

    const newProvisao = await this.provisaoRepository.insert(provisao);

    return newProvisao;
  }

  async getAll(): Promise<ProvisaoEntity[]> {
    return await this.provisaoRepository.getAll();
  }

  async update(id: number, input: ProvisaoProps): Promise<ProvisaoEntity> {
    if (!input.provisao) {
      throw new AppError("Provisao Obrigatório", status.BAD_REQUEST);
    }
    const provisao = new ProvisaoEntity(input);
    return await this.provisaoRepository.update(id, provisao);
  }

  async delete(id: number): Promise<void> {
    return await this.provisaoRepository.delete(id);
  }

  async getById(id: number): Promise<ProvisaoEntity> {
    const provisao = await this.provisaoRepository.getById(id);
    return provisao;
  }
}
