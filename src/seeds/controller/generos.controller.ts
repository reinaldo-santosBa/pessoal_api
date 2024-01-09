import { Request, Response } from "express";
import { GeneroService } from "../service/generos.service";

export class GeneroController {
    async find(request: Request, response: Response) {
        const generoService = new GeneroService();

        const generos = await generoService.find();

        return response.json(generos);
    }
}
