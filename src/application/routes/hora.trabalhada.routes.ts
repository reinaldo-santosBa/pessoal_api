import { Router } from "express";
import HoraTrabalhadaController from "../controller/hora.trabalhada.controller";
import HoraTrabalhadaPostgresRepository from "../../infrastructure/db/hora.trabalhada.repository";
import HoraTrabalhadaService from "../service/hora.trabalhada.service";

const horaTrabalhadaRoutes = Router();

const horaTrabalhadaRepository = new HoraTrabalhadaPostgresRepository();
const horaTrabalhadaService = new HoraTrabalhadaService(horaTrabalhadaRepository);
const horaTrabalhadaController = new HoraTrabalhadaController(horaTrabalhadaService);


horaTrabalhadaRoutes.post("/hora_trabalhada", (req, res) =>
    horaTrabalhadaController.create(req, res)
);

horaTrabalhadaRoutes.get("/hora_trabalhada/:funcionario_id", (req, res) =>
    horaTrabalhadaController.getAllByFuncionario(req, res),
);

horaTrabalhadaRoutes.get("/hora_trabalhada/:id", (req, res) =>
    horaTrabalhadaController.getById(req, res),
);

horaTrabalhadaRoutes.put("/hora_trabalhada/:id", (req, res) =>
    horaTrabalhadaController.update(req, res),
);

horaTrabalhadaRoutes.delete("/hora_trabalhada/:id", (req, res) =>
    horaTrabalhadaController.delete(req, res),
);


export default horaTrabalhadaRoutes;
