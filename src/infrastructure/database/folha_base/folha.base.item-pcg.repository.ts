import FolhaBaseItemPcgEntity from "../../../domain/entity/folha_base/folha.base.itens.pcg";
import { FolhaBaseItemPcgRepository } from "../../../domain/repository/folha/folha.base.item-pcg.repository";

export default class FolhaBaseItemPcgPostgresRepository implements FolhaBaseItemPcgRepository {
  update(id: number, input: FolhaBaseItemPcgEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getById(folha_base_id: number): Promise<FolhaBaseItemPcgEntity> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
