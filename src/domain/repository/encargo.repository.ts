import EncargoEntity from "../entity/encargos";

export interface EncargoRepository {
  insert(input: EncargoEntity): Promise<EncargoEntity>;
  delete(id: number): Promise<void>;
  update(id: number, input: EncargoEntity): Promise<EncargoEntity>;
  getAll(): Promise<EncargoEntity[]>;
  getById(id: number): Promise<number>;
}
