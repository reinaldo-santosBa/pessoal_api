import DescontoEntity from "../entity/desconto";

export interface DescontoRepository {
  insert(input: DescontoEntity): Promise<DescontoEntity>;
  getAll(): Promise<DescontoEntity[]>;
  getById(id: number): Promise<DescontoEntity>;
  update(id: number, input: DescontoEntity): Promise<DescontoEntity>;
  delete(id: number): Promise<void>;
}
