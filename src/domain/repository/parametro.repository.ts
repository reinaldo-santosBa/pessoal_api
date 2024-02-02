import ParametroEntity from "../entity/parametro";

export interface ParametroRepository {
  insert(input: ParametroEntity): Promise<ParametroEntity>;
  getAll(): Promise<ParametroEntity[]>;
  update(id: number, input: ParametroEntity): Promise<ParametroEntity>;
  delete(id: number): Promise<void>;
}
