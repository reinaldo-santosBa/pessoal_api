import { ParamsProcessarFolha, ProcessarFolhaPagamentoRepository } from "../../domain/repository/processar.folha.pagamento.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
import { IFolhaPagamentoFuncionario } from "../../domain/repository/folha/folha.pagamento.repository";


export default class ProcessarFolhaPagamentoService {
  constructor(
        private readonly processarFolhaRepository: ProcessarFolhaPagamentoRepository,
  ) {}

  async getAll(
    params: ParamsProcessarFolha,
  ): Promise<IFolhaPagamentoFuncionario[]> {
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

    const processarFolha =
            await this.processarFolhaRepository.getAll(params);

    if (!processarFolha) {
      throw new AppError("Não encontrado nenhum valor", status.NOT_FOUND);
    }

    return processarFolha;
  }
}
