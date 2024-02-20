import FolhaBaseConvenioCidadeEntity from "../../../domain/entity/folha/folha.base.convenio.cidade";
import { FolhaBaseConvenioCidadeRepository } from "../../../domain/repository/folha/folha.base.convenio-cidade.repository";


export default class FolhaBaseConvenioCidadePostgresRepository
implements FolhaBaseConvenioCidadeRepository
{
  update(id: number, input: FolhaBaseConvenioCidadeEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getById(folha_base_id: number): Promise<FolhaBaseConvenioCidadeEntity> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
