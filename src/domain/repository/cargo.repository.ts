import CargoEntity from "../entity/cargo";

export interface CargoRepository {
  insert(input: CargoEntity): Promise<void>;
  getAll(): Promise<CargoEntity[]>
  update(id: number, input: CargoEntity ): Promise<CargoEntity>
  delete(id: number): Promise<void>;
}
