import AtividadeEntity from "../entity/atividade";

export interface AtividadeRepository {
  insert(input: AtividadeEntity): Promise<AtividadeEntity>;
  getAll(): Promise<AtividadeEntity[]>;
  update(id: number, input: AtividadeEntity): Promise<AtividadeEntity>;
  findById(id: number): Promise<number>;
  delete(id: number): Promise<void>;
}
