import { Router } from "express";
import JornadaTrabalhoPostgresRepository from "../../infrastructure/db/jornada.trabalho.repository";
import JornadaTrabalhoService from "../service/jornada.trabalho.service";
import JornadaTrabalhoController from "../controller/jornada.trabalho.controller";


const routesJornadaTrabalho = Router();

const jornadaTrabalhoRepository = new JornadaTrabalhoPostgresRepository();
const jornadaTrabalhoService = new JornadaTrabalhoService(jornadaTrabalhoRepository);
const jornadaTrabalhoController = new JornadaTrabalhoController(jornadaTrabalhoService);

routesJornadaTrabalho.post(
    "/jornada_trabalho",
    (req, res) =>
        jornadaTrabalhoController.insert(req, res),
);
routesJornadaTrabalho.get(
    "/jornada_trabalho",
    (req, res) =>
        jornadaTrabalhoController.getAll(req, res),
);
routesJornadaTrabalho.delete(
    "/jornada_trabalho/:id",
    (req, res) =>
        jornadaTrabalhoController.delete(req, res),
);

routesJornadaTrabalho.put("/jornada_trabalho/:id", (req, res) =>
    jornadaTrabalhoController.update(req, res)
);

export default routesJornadaTrabalho;
