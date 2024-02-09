import { ParamsProcessarFolha, ProcessarFolhaOutput, ProcessarFolhaPagamentoRepository } from "../../domain/repository/processar.folha.pagamento.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";


export default class ProcessarFolhaPagamentoService {
  constructor(
        private readonly processarFolhaRepository: ProcessarFolhaPagamentoRepository,
    //private readonly jornadaTrabalhoRepository: JornadaTrabalhoRepository,
  ) {}

  async getAll(
    params: ParamsProcessarFolha,
  ): Promise<ProcessarFolhaOutput[]> {
    const camposObrigatorios: string[] = [
      "centro_resultado_id",
      "registrado",
      "mes",
      "ano",
      "dias_uteis",
      "data_fechamento",
      "tipo_folha_id",
    ];

    for (const campo of camposObrigatorios) {
      if (!params[campo]) {
        throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
      }
    }

    const processarFolha = await this.processarFolhaRepository.getAll(params);

    /*  const totalHoraExtraMes: number = 0;

    for await (const funcionario of processarFolha) {
      const cargaTrabalho = await this.jornadaTrabalhoRepository.getByFuncionarioId(funcionario.funcionario_id);
    }*/

    return processarFolha;
  }
}
