import { Router } from "express";
import ModeloContratoPostgresRepository from "../../infrastructure/database/modelo.contrato.repository";
import ModeloContratoService from "../service/modelo.contrato.service";
import ModeloContratoController from "../controller/modelo.contrato.controller";

const routesModeloContrato = Router();

const modeloContratoRepository = new ModeloContratoPostgresRepository();
const modeloContratoService = new ModeloContratoService(modeloContratoRepository);
const modeloContratoController = new ModeloContratoController(modeloContratoService);

routesModeloContrato.post("/modelo_contrato", (req, res) =>
  modeloContratoController.create(req, res)
);

routesModeloContrato.get("/modelo_contrato", (req, res) =>
  modeloContratoController.getAll(req, res),
);


routesModeloContrato.put("/modelo_contrato/:id", (req, res) =>
  modeloContratoController.update(req, res),
);


routesModeloContrato.get("/modelo_contrato/:id", (req, res) =>
  modeloContratoController.getById(req, res),
);


routesModeloContrato.delete("/modelo_contrato/:id", (req, res) =>
  modeloContratoController.delete(req, res),
);


export default routesModeloContrato;
