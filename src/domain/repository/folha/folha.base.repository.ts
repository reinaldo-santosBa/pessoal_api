import { FolhaBaseType } from "../../../infrastructure/types/folha.base.type";
import FolhaBaseEntity from "../../entity/folha_base/folha.base";

export interface IFolhaBaseResult {
    id: number;
    empresa_id: number;
    adiantamento: number;
    ativo: boolean;
    created_at: Date;
    empresa: string;
}


export interface FolhaBaseRepository {
    insert(input: FolhaBaseType): Promise<FolhaBaseType>;
    update(): Promise<void>;
    getAll(): Promise<FolhaBaseType[]>;
    getById(id: number): Promise<FolhaBaseEntity>;
    getAtivo(): Promise<IFolhaBaseResult>;
}
