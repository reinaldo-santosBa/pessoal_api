import JornadaTrabalhoEntity from "../entity/jornada.trabalho";

export interface JornadaTrabalhoRepository {
  insert(input: JornadaTrabalhoEntity): Promise<JornadaTrabalhoEntity>;
  getAll(): Promise<JornadaTrabalhoEntity[]>;
  delete(id: number): Promise<void>;
  update(id: number, input: JornadaTrabalhoEntity): Promise<JornadaTrabalhoEntity>;
  getById(id: number): Promise<number>;
}
