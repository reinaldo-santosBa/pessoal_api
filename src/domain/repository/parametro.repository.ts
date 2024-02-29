import ParametroEntity from "../entity/parametro";

export interface ParametroRepository {
  insert(input: ParametroEntity): Promise<ParametroEntity>;
  getAll(): Promise<ParametroEntity[]>;
  update(input: ParametroEntity): Promise<ParametroEntity>;
  delete(): Promise<void>;
}
