import AdvertenciaEntity from "../entity/advertencia";

export interface AdvertenciaRepository {
  insert(input: AdvertenciaEntity): Promise<AdvertenciaEntity>;
  update(id: number, input: AdvertenciaEntity): Promise<AdvertenciaEntity>;
  getByIdExisting(id: number): Promise<number>;
  getById(id: number): Promise<AdvertenciaEntity>;
  delete(id: number): Promise<void>;
  getByIdFuncionario(funcionario_id: number): Promise<AdvertenciaEntity[]>;
  getAll(): Promise<AdvertenciaEntity[]>;
}
