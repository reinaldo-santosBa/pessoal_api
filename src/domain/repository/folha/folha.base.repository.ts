import { FolhaBaseType } from "../../../infrastructure/types/folha.base.type";

export interface FolhaBaseRepository {
    insert(input: FolhaBaseType): Promise<FolhaBaseType>;
    /*update(id: number, input: FolhaBaseEntity): Promise<FolhaBaseEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaBaseEntity[]>;*/
}
