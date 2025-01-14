import { Router } from "express";
import TipoFolhaPostgresRepository from "../../infrastructure/database/tipo.folha.repository";
import TipoFolhaService from "../service/tipo.folha.service";
import TipoFolhaController from "../controller/tipo.folha.controller";

const tipoFolhaRoutes = Router();

const tipoFolhaRepository = new TipoFolhaPostgresRepository();
const tipoFolhaService = new TipoFolhaService(tipoFolhaRepository);
const tipoFolhaController = new TipoFolhaController(tipoFolhaService);

tipoFolhaRoutes.post("/tipo_folha", (req, res) =>
  tipoFolhaController.create(req, res)
);

tipoFolhaRoutes.get("/tipo_folha", (req, res) =>
  tipoFolhaController.getAll(req, res),
);

tipoFolhaRoutes.put("/tipo_folha/:id", (req, res) =>
  tipoFolhaController.update(req, res),
);

tipoFolhaRoutes.get("/tipo_folha/:id", (req, res) =>
  tipoFolhaController.getById(req, res),
);

tipoFolhaRoutes.delete("/tipo_folha/:id", (req, res) =>
  tipoFolhaController.delete(req, res),
);


export default tipoFolhaRoutes;
