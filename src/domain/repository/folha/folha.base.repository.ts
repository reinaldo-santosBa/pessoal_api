import { FolhaBaseType } from "../../../infrastructure/types/folha.base.type";
import FolhaBaseEntity from "../../entity/folha_base/folha.base";

export interface FolhaBaseRepository {
    insert(input: FolhaBaseType): Promise<FolhaBaseType>;
    update(): Promise<void>;
    getAll(): Promise<FolhaBaseType[]>;
    getById(id: number): Promise<FolhaBaseEntity>;
}
