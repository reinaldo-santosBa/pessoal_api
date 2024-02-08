import TipoRemuneracaoService from "../service/tipo.remuneracao.service";
import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";
import { TipoRemuneracaoProps } from "../../domain/entity/tipo.remuneracao";


export default class TipoRemuneracaoController {
  constructor(
    private readonly tipoRemuneracaoService: TipoRemuneracaoService,
  ) {}

  async create(request: Request, response: Response) {
    const input = request.body as TipoRemuneracaoProps;

    const tipoRemuneracao = await this.tipoRemuneracaoService.create(input);
    return response.status(status.CREATED).json(tipoRemuneracao);
  }

  async getAll(
    request: Request,
    response: Response,
  ) {
    const tiposRemuneracao = await this.tipoRemuneracaoService.getAll();
    return response.json(tiposRemuneracao);
  }

  async getById(
    request: Request,
    response: Response,
  ) {
    const id = request.params.id;
    const tipoRemuneracao = await this.tipoRemuneracaoService.getById(+id);
    return response.json(tipoRemuneracao);
  }

  async update(request: Request, response: Response) {
    const input = request.body as TipoRemuneracaoProps;
    const id = request.params.id;
    const tipoRemuneracao = await this.tipoRemuneracaoService.update(
      +id,
      input
    );

    return response.json(tipoRemuneracao);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    await this.tipoRemuneracaoService.delete(+id);
    return response.status(status.NO_CONTENT).json();
  }
}
