import { Request, Response } from "express";
import ProcessarFolhaPagamentoService from "../service/processar.folha.pagamento.service";
import { ParamsProcessarFolha } from "../../domain/repository/processar.folha.pagamento.repository";

export default class ProcessarFolhaPagamentoController {

  constructor(private readonly processarFolhaService: ProcessarFolhaPagamentoService) { }

  async getAll(request: Request, response: Response) {
    const params: ParamsProcessarFolha = request.body as ParamsProcessarFolha;

    const processarPagamento = await this.processarFolhaService.getAll(params);
    return response.json(processarPagamento);
  }
}
