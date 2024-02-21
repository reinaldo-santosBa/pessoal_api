import FolhaBaseEncargoEntity from "../../../domain/entity/folha_base/folha.base.encargo";
import { FolhaBaseEncargoRepository } from "../../../domain/repository/folha/folha.base.encargo.repository";

export default class FolhaBaseEncargoPostgresRepository implements FolhaBaseEncargoRepository {
  update(id: number, input: FolhaBaseEncargoEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getById(folha_base_id: number): Promise<FolhaBaseEncargoEntity> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
