import { Router } from "express";
import TelefonePostgresRepository from "../../infrastructure/db/telefone.repository";
import TelefoneService from "../service/telefone.service";
import TelefoneController from "../controller/telefone.controller";

const routesTelefone = Router();

const telefoneRepository = new TelefonePostgresRepository();
const telefoneService = new TelefoneService(telefoneRepository);
const telefoneController = new TelefoneController(telefoneService);

routesTelefone.post("/telefone", (req, res) =>
  telefoneController.create(req, res)
);

routesTelefone.get("/telefone/:pessoa_id", (req, res) =>
  telefoneController.getByIdPessoa(req, res),
);

routesTelefone.put("/telefone/:id", (req, res) =>
  telefoneController.update(req, res)
);

routesTelefone.delete("/telefone/:id", (req, res) =>
  telefoneController.delete(req, res),
);


export default routesTelefone;
