import CargoEntity from "../entity/cargo";

export interface CargoRepository {
  insert(input: CargoEntity): Promise<CargoEntity>;
  getAll(): Promise<CargoEntity[]>;
  update(id: number, input: CargoEntity): Promise<CargoEntity>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<number>;
}
