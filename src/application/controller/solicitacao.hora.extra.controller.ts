import { Request, Response } from "express";
import { SolicitacaoHoraExtraProps } from "../../domain/entity/solicitacao.hora.extra";
import SolicitacaoHoraExtraService from "../service/solicitacao.hora.extra.service";
import * as status from "../../constraints/http.stauts";


export default class SolicitacaoHoraExtraController {
  constructor(private readonly solicitacaoHoraExtraService: SolicitacaoHoraExtraService) {}

  async create(request: Request, response: Response) {
    const input = request.body as SolicitacaoHoraExtraProps;

    const newSolicitacaoHoraExtra = await this.solicitacaoHoraExtraService.create(input);

    return response.status(status.CREATED).json(newSolicitacaoHoraExtra);
  }

  async getAllFuncionarioId(request: Request, response: Response) {
    const funcionario_id = request.params.funcionario_id;
    const solicitacoesHorasExtras = await this.solicitacaoHoraExtraService.getAllFuncionarioId(+funcionario_id);
    return response.json(solicitacoesHorasExtras);
  }

  async update(request: Request, response: Response) {
    const input = request.body as SolicitacaoHoraExtraProps;
    const id = request.params.id;

    const updateSolicitacaoHoraExtra = await this.solicitacaoHoraExtraService.update(
      +id,
      input
    );

    return response.json(updateSolicitacaoHoraExtra);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    await this.solicitacaoHoraExtraService.delete(+id);
    return response.status(status.NO_CONTENT).json();
  }
}
