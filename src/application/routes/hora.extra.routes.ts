import { Router } from "express";
import HoraExtraPostgresRepository from "../../infrastructure/database/hora.extra.repository";
import HoraExtraService from "../service/hora.extra.service";
import HoraExtraController from "../controller/hora.extra.controller";

const routesHoraExtra = Router();

const horaExtraRepository = new HoraExtraPostgresRepository();
const horaExtraService = new HoraExtraService(horaExtraRepository);
const horaExtraController = new HoraExtraController(horaExtraService);


routesHoraExtra.post("/hora_extra", (req, res) =>
  horaExtraController.create(req, res),
);

routesHoraExtra.get("/hora_extra/funcionario/:funcionario_id", (req, res) =>
  horaExtraController.getAllFuncionarioId(req, res),
);

routesHoraExtra.get("/hora_extra", (req, res) =>
  horaExtraController.getAll(req, res),
);

routesHoraExtra.get("/hora_extra/:id", (req, res) =>
  horaExtraController.getById(req, res),
);

routesHoraExtra.put("/hora_extra/:id", (req, res) =>
  horaExtraController.create(req, res),
);

routesHoraExtra.delete("/hora_extra/:id", (req, res) =>
  horaExtraController.delete(req, res),
);



export default routesHoraExtra;
