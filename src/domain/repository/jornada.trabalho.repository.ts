import JornadaTrabalhoEntity from "../entity/jornada.trabalho";

export type CargaDiariaOutput = {
  carga_diaria: number;
}
export interface JornadaTrabalhoRepository {
  insert(input: JornadaTrabalhoEntity): Promise<JornadaTrabalhoEntity>;
  getAll(): Promise<JornadaTrabalhoEntity[]>;
  delete(id: number): Promise<void>;
  update(
    id: number,
    input: JornadaTrabalhoEntity,
  ): Promise<JornadaTrabalhoEntity>;
  getById(id: number): Promise<JornadaTrabalhoEntity>;
  getByIdExisting(id: number): Promise<number>;
  getByFuncionarioId(funcionario_id: number): Promise<CargaDiariaOutput>;
}
