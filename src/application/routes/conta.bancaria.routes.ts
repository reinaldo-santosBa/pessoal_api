import { Router, Request, Response } from "express";
import ContaBancariaPostgresRepository from "../../infrastructure/database/conta.bancaria.repository";
import ContaBancariaService from "../service/conta.bancaria.service";
import ContaBancariaController from "../controller/conta.bancaria.controller";

const routesContaBancaria = Router();

const contaBancariaRepository = new ContaBancariaPostgresRepository();
const contaBancariaService = new ContaBancariaService(contaBancariaRepository);
const contaBancariaController = new ContaBancariaController(contaBancariaService);

routesContaBancaria.post("/conta_bancaria", (req: Request, res: Response) =>
  contaBancariaController.create(req, res),
);

routesContaBancaria.get("/conta_bancaria/:pessoa_id", (req, res) =>
  contaBancariaController.getByIdPessoa(req, res),
);

routesContaBancaria.put("/conta_bancaria/:id", (req, res) =>
  contaBancariaController.update(req, res),
);

routesContaBancaria.delete("/conta_bancaria/:id", (req, res) =>
  contaBancariaController.delete(req, res),
);

export default routesContaBancaria;
