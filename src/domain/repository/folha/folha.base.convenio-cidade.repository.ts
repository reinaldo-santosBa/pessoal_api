import FolhaBaseConvenioCidadeEntity from "../../entity/folha_base/folha.base.convenio.cidade";

export interface FolhaBaseConvenioCidadeRepository {
    update(id: number, input: FolhaBaseConvenioCidadeEntity): Promise<void>;
    getById(folha_base_id: number): Promise<FolhaBaseConvenioCidadeEntity>;
    delete(id: number): Promise<void>;
}
