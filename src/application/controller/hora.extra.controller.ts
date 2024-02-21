import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";
import HoraExtraService from "../service/hora.extra.service";
import { HoraExtraProps } from "../../domain/entity/hora.extra";


export default class HoraExtraController {
  constructor(private readonly horaExtraService: HoraExtraService) {}

  async create(request: Request, response: Response) {
    const input = request.body as HoraExtraProps;

    const newHoraExtra = await this.horaExtraService.create(input);

    return response.status(status.CREATED).json(newHoraExtra);
  }

  async getAllFuncionarioId(request: Request, response: Response) {
    const funcionario_id = request.params.funcionario_id;
    const horasExtras =
            await this.horaExtraService.getAllFuncionarioId(+funcionario_id);
    return response.json(horasExtras);
  }

  async update(request: Request, response: Response) {
    const input = request.body as HoraExtraProps;
    const id = request.params.id;

    const updateHoraExtra = await this.horaExtraService.update(+id, input);

    return response.json(updateHoraExtra);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    await this.horaExtraService.delete(+id);
    return response.status(status.NO_CONTENT).json();
  }

  async getAll(request: Request, response: Response) {
    const horasExtras = await this.horaExtraService.getAll();
    return response.json(horasExtras);
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;
    await this.horaExtraService.getById(+id);
    return response.status(status.NO_CONTENT).json();
  }
}
