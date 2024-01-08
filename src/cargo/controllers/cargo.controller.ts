import { Request, Response } from "express";

export class CargoController {
    async create(request: Request, response: Response) {
        return response.json("foi");
    }
}
