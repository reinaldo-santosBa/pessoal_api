import {Request, Response } from "express";
import { EnderecoService } from "../services/endereco.service";

export class EnderecoController{
    async create(request: Request, response: Response) {
        const enderecoService = new EnderecoService();

        const endereco = await enderecoService.create();
        return response.status(201).json(endereco);
    }

}
