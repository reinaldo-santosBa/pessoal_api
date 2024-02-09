import FolhaPagamentoService, { FolhaPagamentoInput } from "../service/folha.pagamento.service";
import { Request, Response } from "express";

export default class FolhaPagamentoController {
  constructor(
        private readonly folhaPagamentoService: FolhaPagamentoService,
  ) {}

  async create(request: Request, response: Response) {
    const input = request.body as FolhaPagamentoInput;
    const folhaPagamento = await this.folhaPagamentoService.create(input);

    return response.json(folhaPagamento);
  }
}
