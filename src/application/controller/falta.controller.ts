import { Request, Response } from "express";
import { FaltaProps } from "../../domain/entity/falta";
import * as status from "../../constraints/http.stauts";
import FaltaService from "../service/falta.service";


export default class FaltaController {
  constructor(private readonly faltaService: FaltaService) {}

  async create(request: Request, response: Response) {
    const input = request.body as FaltaProps;
    const falta = await this.faltaService.create(input);
    return response.status(status.CREATED).json(falta);
  }

  async getAll(request: Request, response: Response) {
    const faltas = await this.faltaService.getAll();
    return response.json(faltas);
  }

  async getByFuncionarioId(request: Request, response: Response) {
    const funcionario_id = request.params.funcionario_id;
    const faltas = await this.faltaService.getByFuncionarioId(+funcionario_id);
    return response.json(faltas);
  }

  async update(request: Request, response: Response) {
    const input = request.body as FaltaProps;
    const id = request.params.id;
    await this.faltaService.update(+id, input);
    return response.status(status.NO_CONTENT).json();
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    await this.faltaService.delete(+id);
    return response.status(status.NO_CONTENT).json();
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;
    const falta = await this.faltaService.getById(+id);
    return response.json(falta);
  }
}
