import { Router } from "express";
import DiaJornadaPostgresRepository from "../../infrastructure/db/dia.jornada.trabalho.repository";
import DiaJornadaTrabalhoService from "../service/dia.jornada.trabalho.service";
import DiaTrabalhoController from "../controller/dia.trabalho.controller";

const routesDiaTrabalho = Router();

const diaJornadaTrabalhoRepository = new DiaJornadaPostgresRepository();
const diaJornadaTrabalhoService = new DiaJornadaTrabalhoService(diaJornadaTrabalhoRepository);
const diaJornadaTrabalhoController = new DiaTrabalhoController(diaJornadaTrabalhoService);


routesDiaTrabalho.post("/dia_trabalho", (req, res) =>
    diaJornadaTrabalhoController.create(req, res)
);

routesDiaTrabalho.get("/dia_trabalho", (req, res) =>
    diaJornadaTrabalhoController.getAll(req, res),
);

routesDiaTrabalho.get("/dia_trabalho/:id", (req, res) =>
    diaJornadaTrabalhoController.getById(req, res),
);


routesDiaTrabalho.put("/dia_trabalho/:id", (req, res) =>
    diaJornadaTrabalhoController.update(req, res),
);

routesDiaTrabalho.delete("/dia_trabalho/:id", (req, res) =>
    diaJornadaTrabalhoController.delete(req, res),
);


export default routesDiaTrabalho;
