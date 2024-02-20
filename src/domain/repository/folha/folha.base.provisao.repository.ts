import FolhaBaseProvisaoEntity from "../../entity/folha/folha.base.provisao";

export interface FolhaBaseProvisaoRepository {
    update(id: number, input: FolhaBaseProvisaoEntity): Promise<void>;
    getById(folha_base_id: number): Promise<FolhaBaseProvisaoEntity>;
    delete(id: number): Promise<void>;
}
