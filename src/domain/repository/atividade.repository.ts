import AtividadeEntity from "../entity/atividade";

export interface AtividadeRepository {
  insert(input: AtividadeEntity): Promise<AtividadeEntity>;
  getAll(): Promise<AtividadeEntity[]>;
  update(id: number, input: AtividadeEntity): Promise<AtividadeEntity>;
  getByIdExisting(id: number): Promise<number>;
  getById(id: number): Promise<AtividadeEntity>;
  delete(id: number): Promise<void>;
}
