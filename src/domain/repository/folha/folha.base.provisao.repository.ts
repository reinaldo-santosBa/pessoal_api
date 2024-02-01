import FolhaBaseProvisaoEntity from "../../entity/folha/folha.base.provisao";

export interface FolhaBaseProvisaoRepository {
  insert(input: FolhaBaseProvisaoEntity): Promise<FolhaBaseProvisaoEntity>;
  update(
    id: number,
    input: FolhaBaseProvisaoEntity,
  ): Promise<FolhaBaseProvisaoEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaBaseProvisaoEntity>;
}
