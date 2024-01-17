import AdvertenciaEntity from "../entity/advertencia";

export interface AdvertenciaRepository {
  insert(input: AdvertenciaEntity): Promise<AdvertenciaEntity>;
  update(id: number, input: AdvertenciaEntity): Promise<AdvertenciaEntity>;
  getById(id: number): Promise<number>;
  delete(id: number): Promise<void>;
  getByIdFuncionario(funcionario_id: number): Promise<AdvertenciaEntity[]>;
}
