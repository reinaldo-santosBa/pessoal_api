import { Router } from "express";
import FaltaPostgresRepository from "../../infrastructure/database/falta.repository";
import FaltaService from "../service/falta.service";
import FaltaController from "../controller/falta.controller";

const routesFalta = Router();
const faltaRepository = new FaltaPostgresRepository();
const faltaService = new FaltaService(faltaRepository);
const faltaController = new FaltaController(faltaService);


routesFalta.post("/falta", (req, res) =>
  faltaController.create(req, res)
);

routesFalta.get("/falta", (req, res) => faltaController.getAll(req, res));


routesFalta.get("/falta/funcionario/:funcionario_id", (req, res) => faltaController.getByFuncionarioId(req, res));

routesFalta.get("/falta/:id", (req, res) =>
  faltaController.getById(req, res),
);

routesFalta.put("/falta/:id", (req, res) => faltaController.update(req, res));


routesFalta.delete("/falta/:id", (req, res) => faltaController.delete(req, res));

export default routesFalta;
