import AtividadeEntity from "../entity/atividade";

export interface AtividadeRepository {
  insert(input: AtividadeEntity): Promise<void>;
  getAll(): Promise<AtividadeEntity[]>;
  update(id: number, input: AtividadeEntity): Promise<AtividadeEntity>;
  delete(id: number): Promise<void>;
}
