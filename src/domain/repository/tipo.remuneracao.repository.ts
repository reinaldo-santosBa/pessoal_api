import TipoRemuneracaoEntity from "../entity/tipo.remuneracao";

export interface TipoRemuneracaoRepository {
  insert(input: TipoRemuneracaoEntity): Promise<TipoRemuneracaoEntity>;
  getAll(): Promise<TipoRemuneracaoEntity[]>;
  getById(id: number): Promise<TipoRemuneracaoEntity>;
  update(id: number, input: TipoRemuneracaoEntity): Promise<TipoRemuneracaoEntity>;
  delete(id: number): Promise<void>;
}
