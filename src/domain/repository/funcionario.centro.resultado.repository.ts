import FuncionarioCentroResultadoEntity from "../entity/funcionario.centro.resultado";

export interface FuncionarioCentroResultadoRepository {
  insert(
    input: FuncionarioCentroResultadoEntity,
  ): Promise<FuncionarioCentroResultadoEntity>;

  update(
    id: number
  ): Promise<FuncionarioCentroResultadoEntity>;

  delete(id: number): Promise<void>;

  getAllByFuncionarioId(
    funcionario_id: number,
  ): Promise<FuncionarioCentroResultadoEntity[]>;

  getAllByCentroResultadoId(
    centro_resultado_id: number,
  ): Promise<FuncionarioCentroResultadoEntity[]>;
}
