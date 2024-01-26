import ProvisaoEntity from "../entity/provisao";

export interface ProvisaoRepository {
  insert(input: ProvisaoEntity): Promise<ProvisaoEntity>;
  getAll(): Promise<ProvisaoEntity[]>;
  update(id: number, input: ProvisaoEntity): Promise<ProvisaoEntity>;
  delete(id: number): Promise<void>;
}
