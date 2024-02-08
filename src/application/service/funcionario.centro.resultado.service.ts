import FuncionarioCentroResultadoEntity, {
  FuncionarioCentroResultadoProps,
} from "../../domain/entity/funcionario.centro.resultado";
import { FuncionarioCentroResultadoRepository } from "../../domain/repository/funcionario.centro.resultado.repository";

export default class FuncionarioCentroResultadoService {
  constructor(
    private readonly funcionarioCentroResultadoRepository: FuncionarioCentroResultadoRepository,
  ) {}

  async create(
    input: FuncionarioCentroResultadoProps,
  ): Promise<FuncionarioCentroResultadoEntity> {
    await this.funcionarioCentroResultadoRepository.update(input.id);

    const funcionarioCentroResultadoEntity = new FuncionarioCentroResultadoEntity(input);
    const newfuncionarioCentroResult = await this.funcionarioCentroResultadoRepository.insert(funcionarioCentroResultadoEntity);
    return newfuncionarioCentroResult;
  }

  async delete(id: number): Promise<void> {
    await this.funcionarioCentroResultadoRepository.delete(id);
  }

  async getAllByFuncionarioId(
    funcionario_id: number,
  ): Promise<FuncionarioCentroResultadoEntity[]> {
    const funcionarioCentroResult = await this.funcionarioCentroResultadoRepository.getAllByFuncionarioId(funcionario_id);
    return funcionarioCentroResult;
  }

  async getAllByCentroResultadoId(
    centro_resultado_id: number,
  ): Promise<FuncionarioCentroResultadoEntity[]> {
    const funcionarioCentroResult = await this.funcionarioCentroResultadoRepository.getAllByCentroResultadoId(centro_resultado_id);
    return funcionarioCentroResult;
  }
}
