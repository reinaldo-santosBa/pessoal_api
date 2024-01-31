import TipoFolhaEntity from "../entity/tipo.folha";

export interface TipoFolhaRepository {
  insert(input: TipoFolhaEntity): Promise<TipoFolhaEntity>;
  getAll(): Promise<TipoFolhaEntity[]>;
  update(id: number, input: TipoFolhaEntity): Promise<TipoFolhaEntity>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<TipoFolhaEntity>;
  getByIdExisting(id: number): Promise<number>;
}
