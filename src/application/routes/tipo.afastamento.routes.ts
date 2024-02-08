import { Router } from "express";
import TipoAfastamentoPostgresRepository from "../../infrastructure/db/tipo.afastamento.repository";
import TipoAfastamentoService from "../service/tipo.afastamento.service";
import TipoAfastamentoController from "../controller/tipo.afastamento.controller";

const routesTipoAfastamento = Router();

const tipoAfastamentoRepository = new TipoAfastamentoPostgresRepository();
const tipoAfastamentoService = new TipoAfastamentoService(tipoAfastamentoRepository);
const tipoAfastamentoController = new TipoAfastamentoController(tipoAfastamentoService);

routesTipoAfastamento.post("/tipo_afastamento", (req, res) =>
  tipoAfastamentoController.create(req, res)
);

routesTipoAfastamento.get("/tipo_afastamento", (req, res) =>
  tipoAfastamentoController.getAll(req, res)
);

routesTipoAfastamento.put("/tipo_afastamento/:id", (req, res) =>
  tipoAfastamentoController.update(req, res),
);


routesTipoAfastamento.get("/tipo_afastamento/:id", (req, res) =>
  tipoAfastamentoController.getById(req, res),
);


routesTipoAfastamento.delete("/tipo_afastamento/:id", (req, res) =>
  tipoAfastamentoController.delete(req, res),
);


export default routesTipoAfastamento;
