import { Router } from "express";
import AtividadePostgresRepository from "../../infrastructure/db/atividade.repository";
import AtividadeService from "../service/atividade.service";
import AtividadeController from "../controller/atividade.controller";

const routesAtividade = Router();

const atividadeRepository = new AtividadePostgresRepository();
const atividadeService = new AtividadeService(atividadeRepository);
const atividadeController = new AtividadeController(atividadeService);

routesAtividade.post("/atividade", (req, res) =>
    atividadeController.create(req, res),
);

routesAtividade.get("/atividade", (req, res) =>
    atividadeController.getAll(req, res)
);

routesAtividade.get("/atividade/:id", (req, res) =>
    atividadeController.getById(req, res),
);

routesAtividade.put("/atividade/:id", (req, res) =>
    atividadeController.update(req, res)
);

routesAtividade.delete("/atividade/:id", (req, res) =>
    atividadeController.delete(req, res)
);

export default routesAtividade;
