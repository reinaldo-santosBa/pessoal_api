import TipoRemuneracaoEntity, { TipoRemuneracaoProps } from "../../domain/entity/tipo.remuneracao";
import { TipoRemuneracaoRepository } from "../../domain/repository/tipo.remuneracao.repository";

export default class TipoRemuneracaoService {
  constructor(
    private readonly tipoRemuneracaoRepository: TipoRemuneracaoRepository,
  ) {}

  async create(input: TipoRemuneracaoProps): Promise<TipoRemuneracaoEntity> {
    const tipoRemuneracaoEntity = new TipoRemuneracaoEntity(input);
    const tipoRemuneracao = await this.tipoRemuneracaoRepository.insert(tipoRemuneracaoEntity);
    return tipoRemuneracao;
  }

  async getAll(): Promise<TipoRemuneracaoEntity[]>{
    const tiposRemuneracao = await this.tipoRemuneracaoRepository.getAll();
    return tiposRemuneracao;
  }

  async getById(id: number): Promise<TipoRemuneracaoEntity>{

    const tipoRemuneracao = await this.tipoRemuneracaoRepository.getById(id);
    return tipoRemuneracao;
  }

  async update(
    id: number,
    input: TipoRemuneracaoProps,
  ): Promise<TipoRemuneracaoEntity> {
    const tipoRemuneracaoEntity = new TipoRemuneracaoEntity(input);
    const tipoRemuneracao = await this.tipoRemuneracaoRepository.update(id,tipoRemuneracaoEntity);

    return tipoRemuneracao;
  }

  async delete(id: number): Promise<void> {
    await this.tipoRemuneracaoRepository.delete(id);
  }
}
