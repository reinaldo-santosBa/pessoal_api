import DiaJornadaTrabalhoEntity from "../entity/dia.jornada.trabalho";

export interface DiaJornadaTrabalhoRepository {
  insert(input: DiaJornadaTrabalhoEntity): Promise<DiaJornadaTrabalhoEntity>;
  getAll(): Promise<DiaJornadaTrabalhoEntity[]>;
  delete(id: number): Promise<void>;
  update(id: number,
    input: DiaJornadaTrabalhoEntity,
  ): Promise<DiaJornadaTrabalhoEntity>;
  getById(id: number): Promise<number>;
}
