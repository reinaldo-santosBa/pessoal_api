import ParametroSevice from "../service/parametro.service";
import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";
import { ParametroProps } from "../../domain/entity/parametro";


export default class ParametroController {
  constructor(private readonly parametroService: ParametroSevice) {}

  async create(request: Request, response: Response) {
    const input = request.body as ParametroProps;
    const parametro = await this.parametroService.create(input);
    return response.status(status.CREATED).json(parametro);
  }

  async getAll(request: Request, response: Response) {
    const parametros = await this.parametroService.getAll();
    return response.json(parametros);
  }


  async update(request: Request, response: Response) {
    const id = request.params.id;
    const input = request.body as ParametroProps;

    const parametro = await this.parametroService.update(+id, input);
    return response.json(parametro);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    await this.parametroService.delete(+id);
    return response.status(status.NO_CONTENT).json();
  }
}
