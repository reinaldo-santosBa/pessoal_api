import { Request, Response } from "express";
import ProcessarFolhaPagamentoService from "../service/processar.folha.pagamento.service";
import { ParamsProcessarFolha } from "../../domain/repository/processar.folha.pagamento.repository";

export default class ProcessarFolhaPagamentoController {

    constructor(private readonly processarFolhaService: ProcessarFolhaPagamentoService) { }

    async getAll(request: Request, response: Response) {
        const params: ParamsProcessarFolha = {
            centro_resultado_id: Number(request.query.centro_resultado_id),
            registrado: Boolean(request.query.registrado),
            mes: Number(request.query.mes),
            ano: Number(request.query.ano),
            dias_uteis: Number(request.query.dias_uteis),
            data_fechamento: String(request.query.data_fechamento),
            funcionario_id: Number(request.query.funcionario_id),
            tipo_folha_id: Number(request.query.tipo_folha_id),
        };



        const processarPagamento = await this.processarFolhaService.getAll(params);
        return response.json(processarPagamento);
    }
}
