import { Request, Response } from "express";
import AtividadeService from "../service/atividade.service";
import { AtividadeProps } from "../../domain/entity/atividade";
import * as status from "../../constraints/http.stauts";

export default class AtividadeController {
  constructor(private readonly atividadeService: AtividadeService) {}

  async create(request: Request, response: Response) {
    const input = request.body as AtividadeProps;

    const newAtidade = await this.atividadeService.create(input);

    return response.status(status.CREATED).json(newAtidade);
  }

  async getAll(request: Request, response: Response) {
    const atividades = await this.atividadeService.getAll();
    return response.json(atividades);
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;
    const input = request.body as AtividadeProps;

    const atividade = await this.atividadeService.update(+id, input);
    return response.json(atividade);
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;

    const atividade = await this.atividadeService.getById(+id);
    return response.json(atividade);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    await this.atividadeService.delete(+id);

    return response.status(status.NO_CONTENT).json();
  }
}
