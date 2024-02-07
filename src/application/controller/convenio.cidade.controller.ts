import ConvenioCidadeService from "../service/convenio.cidade.service";
import * as status from "../../constraints/http.stauts";
import { Request, Response } from "express";
import { ConvenioCidadeProps } from "../../domain/entity/convenio.cidade";


export default class ConvenioCidadeController {
    constructor(
        private readonly convenioCidadeService: ConvenioCidadeService,
    ) {}

    async create(request: Request, response: Response) {
        const input = request.body as ConvenioCidadeProps;
        const convenioCidade = await this.convenioCidadeService.create(input);
        return response.status(status.CREATED).json(convenioCidade);
    }

    async update(
        request: Request,
        response: Response,
    ) {
        const id = request.params.id;
        const input = request.body as ConvenioCidadeProps;
        const convenioCidade = await this.convenioCidadeService.update(
            +id,
            input,
        );
        return response.json(convenioCidade);
    }

    async geAll(
        request: Request,
        response: Response,
    ) {
        const convenioCidade = await this.convenioCidadeService.geAll();
        return response.json(convenioCidade);
    }

    async getById(
        request: Request,
        response: Response,
    ) {
        const id = request.params.id;
        const convenioCidade = await this.convenioCidadeService.getById(+id);
        return response.json(convenioCidade);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.convenioCidadeService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }
}
