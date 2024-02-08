import { TipoFolhaProps } from "../../domain/entity/tipo.folha";
import TipoFolhaService from "../service/tipo.folha.service";
import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";


export default class TipoFolhaController {
  constructor(private readonly tipoFolhaService: TipoFolhaService) {}

  async create(request: Request, response: Response) {
    const { tipo_folha } = request.body as TipoFolhaProps;
    const newtipoFolha = await this.tipoFolhaService.create({ tipo_folha });

    return response.status(status.CREATED).json(newtipoFolha);
  }

  async getAll(request: Request, response: Response) {
    const tiposFolha = await this.tipoFolhaService.getAll();

    return response.json(tiposFolha);
  }

  async getById(request: Request, response: Response) {
    const id = request.params.id;
    const tipoFolha = await this.tipoFolhaService.getById(+id);
    return response.json(tipoFolha);
  }
  async update(request: Request, response: Response) {
    const { tipo_folha } = request.body as TipoFolhaProps;
    const id = request.params.id;
    const updateTipoFolha = await this.tipoFolhaService.update(+id,{ tipo_folha });

    return response.json(updateTipoFolha);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    await this.tipoFolhaService.delete(+id);
    return response.status(status.NO_CONTENT).json();
  }
}
