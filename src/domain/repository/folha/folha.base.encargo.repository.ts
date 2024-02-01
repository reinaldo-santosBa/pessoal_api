import FolhaBaseEncargoEntity from "../../entity/folha/folha.base.encargo";

export interface FolhaBaseEncargoRepository {
  insert(input: FolhaBaseEncargoEntity): Promise<FolhaBaseEncargoEntity>;
  update(
    id: number,
    input: FolhaBaseEncargoEntity,
  ): Promise<FolhaBaseEncargoEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaBaseEncargoEntity[]>;
}
