import FolhaBaseService, { FolhaBaseInput } from "../service/folha.base.service";
import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";

export default class FolhaBaseController {
    constructor(private readonly folhabaseService: FolhaBaseService) {}

    async create(request: Request, response: Response) {
        const input = request.body as FolhaBaseInput;
        const folhaBase = await this.folhabaseService.create(input);

        return response.status(status.CREATED).json(folhaBase);
    }
}
