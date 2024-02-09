import { FolhaBaseType } from "../../../infrastructure/types/folha.base.type";

export interface FolhaBaseRepository {
    insert(input: FolhaBaseType): Promise<FolhaBaseType>;
    update(): Promise<void>;
    //getAll(): Promise<FolhaBaseType[]>;
    /*delete(id: number): Promise<void>;
  get(): Promise<FolhaBaseEntity[]>;*/
}
