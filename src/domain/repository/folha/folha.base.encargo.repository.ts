import FolhaBaseEncargoEntity from "../../entity/folha/folha.base.encargo";

export interface FolhaBaseEncargoRepository {
    update(id: number, input: FolhaBaseEncargoEntity): Promise<void>;
    getById(folha_base_id: number): Promise<FolhaBaseEncargoEntity>;
    delete(id: number): Promise<void>;
}
