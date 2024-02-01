import FolhaBaseItemPcgEntity from "../../entity/folha/folha.base.itens.pcg";

export interface FolhaBaseItensPcgRepository {
  insert(input: FolhaBaseItemPcgEntity): Promise<FolhaBaseItemPcgEntity>;
  update(
    id: number,
    input: FolhaBaseItemPcgEntity,
  ): Promise<FolhaBaseItemPcgEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaBaseItemPcgEntity[]>;
}
