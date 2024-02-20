import FolhaBaseItemPcgEntity from "../../entity/folha/folha.base.itens.pcg";

export interface FolhaBaseItemPcgRepository {
    update(id: number, input: FolhaBaseItemPcgEntity): Promise<void>;
    getById(folha_base_id: number): Promise<FolhaBaseItemPcgEntity>;
    delete(id: number): Promise<void>;
}
