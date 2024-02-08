import { Router } from "express";
import ProvisaoPostgresRepository from "../../infrastructure/db/provisao.repository";
import ProvisaoService from "../service/provisao.service";
import ProvisaoController from "../controller/provisao.controller";

const routesProvisao = Router();

const provisaoRepository = new ProvisaoPostgresRepository();
const provisaoService = new ProvisaoService(provisaoRepository);
const provisaoController = new ProvisaoController(provisaoService);

routesProvisao.post("/provisao", (req, res) =>
  provisaoController.create(req, res)
);

routesProvisao.get("/provisao", (req, res) =>
  provisaoController.getAll(req, res),
);

routesProvisao.put("/provisao/:id", (req, res) =>
  provisaoController.update(req, res),
);


routesProvisao.get("/provisao/:id", (req, res) =>
  provisaoController.getById(req, res),
);


routesProvisao.delete("/provisao/:id", (req, res) =>
  provisaoController.delete(req, res),
);


export default routesProvisao;
