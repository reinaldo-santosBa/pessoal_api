import { inputFolhaPagamento } from "../../domain/repository/folha/folha.pagamento.repository";
import FolhaPagamentoService from "../service/folha.pagamento.service";
import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";
export default class FolhaPagamentoController {
  constructor(
        private readonly folhaPagamentoService: FolhaPagamentoService,
  ) {}

  async create(request: Request, response: Response) {
    const input = request.body as inputFolhaPagamento;
    const folhaPagamento = await this.folhaPagamentoService.create(input);

    return response.status(status.CREATED).json(folhaPagamento);
  }
}
