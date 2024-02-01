import FolhaBaseConvenioEntity from "../../entity/folha/folha.base.convenio";

export interface FolhaBaseConvenioRepository {
  insert(input: FolhaBaseConvenioEntity): Promise<FolhaBaseConvenioEntity>;
  update(
    id: number,
    input: FolhaBaseConvenioEntity,
  ): Promise<FolhaBaseConvenioEntity>;
  delete(id: number): Promise<void>;
  get(): Promise<FolhaBaseConvenioEntity[]>;
}
