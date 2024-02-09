import ConvenioCidadeEntity, { ConvenioCidadeProps } from "../../domain/entity/convenio.cidade";
import { ConvenioCidadeRepository } from "../../domain/repository/convenio.cidade.repository";
import { AllConvenioCidade } from "../../infrastructure/db/convenio.cidade.repository";

export default class ConvenioCidadeService {
  constructor(
        private readonly convenioCidadeRepository: ConvenioCidadeRepository,
  ) {}

  async create(input: ConvenioCidadeProps): Promise<ConvenioCidadeEntity> {
    const convenioCidadeEntity = new ConvenioCidadeEntity(input);
    const convenioCidade =
            await this.convenioCidadeRepository.insert(convenioCidadeEntity);
    return convenioCidade;
  }

  async update(
    id: number,
    input: ConvenioCidadeProps,
  ): Promise<ConvenioCidadeEntity> {
    const convenioCidadeEntity = new ConvenioCidadeEntity(input);
    const convenioCidade = await this.convenioCidadeRepository.update(
      id,
      convenioCidadeEntity,
    );
    return convenioCidade;
  }

  async getByCidadeId(cidade_id: number): Promise<ConvenioCidadeEntity[]> {
    const conveniosCidade = await this.convenioCidadeRepository.getByCidadeId(cidade_id);
    return conveniosCidade;
  }

  async geAll(): Promise<AllConvenioCidade[]> {
    const convenioCidade = await this.convenioCidadeRepository.geAll();
    return convenioCidade;
  }

  async getById(id: number): Promise<ConvenioCidadeEntity> {
    const convenioCidade = await this.convenioCidadeRepository.getById(id);
    return convenioCidade;
  }

  async delete(id: number): Promise<void> {
    await this.convenioCidadeRepository.delete(id);
  }
}
