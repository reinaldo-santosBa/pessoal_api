import { ParamsProcessarFolha, ProcessarFolhaOutput, ProcessarFolhaPagamentoRepository } from "../../domain/repository/processar.folha.pagamento.repository";

export default class ProcessarFolhaPagamentoService {
    constructor(
        private readonly processarFolhaRepository: ProcessarFolhaPagamentoRepository,
    ) {}

    async getAll(params: ParamsProcessarFolha): Promise<ProcessarFolhaOutput[]> {
        const processarFolha =
            await this.processarFolhaRepository.getAll(params);

        return processarFolha;
    }
}
