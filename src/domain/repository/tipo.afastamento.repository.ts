import TipoAfastamentoEntity from "../entity/tipo.afastamento";

export interface TipoAfastamentoRepository {
  insert(input: TipoAfastamentoEntity): Promise<TipoAfastamentoEntity>;
  delete(id: number): Promise<void>;
  update(
    id: number,
    input: TipoAfastamentoEntity,
  ): Promise<TipoAfastamentoEntity>;
  getAll(): Promise<TipoAfastamentoEntity[]>;
  getById(id: number): Promise<TipoAfastamentoEntity>;
  getByIdExisting(id: number): Promise<number>;
}
