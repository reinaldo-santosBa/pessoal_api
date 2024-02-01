import FolhaBaseEntity from "../../entity/folha/folha.base";

export interface FolhaBaseRepository {
  insert(input: FolhaBaseEntity): Promise<FolhaBaseEntity>;
  update(id: number, input: FolhaBaseEntity): Promise<FolhaBaseEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaBaseEntity[]>;
}
