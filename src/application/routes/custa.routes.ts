import { Router } from "express";
import CustaPostgresRepository from "../../infrastructure/db/custa.repository";
import CustaService from "../service/custa.service";
import CustaController from "../controller/custa.controller";

const routesCusta = Router();

const custaRepository = new CustaPostgresRepository();
const custaService = new CustaService(custaRepository);
const custaController = new CustaController(custaService);

routesCusta.post("/custa", (req, res) =>
    custaController.create(req, res)
);

routesCusta.get("/custa/:funcionario_id", (req, res) =>
    custaController.getAllFuncionarioId(req, res)
);


routesCusta.put("/custa/:id", (req, res) =>
    custaController.update(req, res)
);


routesCusta.delete("/custa/:id", (req, res) =>
    custaController.delete(req, res)
);

export default routesCusta;
