import { Router } from "express";
import FuncionarioCentroResultadoPostgresRepository from "../../infrastructure/database/funcionario.centro.resultado.repository";
import FuncionarioCentroResultadoService from "../service/funcionario.centro.resultado.service";
import FuncionarioCentroResultadoController from "../controller/funcionario.centro.resultado.controller";

const funcionarioCentroResultadoRoutes = Router();

const funcionarioCentroResultadoRepository = new FuncionarioCentroResultadoPostgresRepository();
const funcionarioCentroResultadoService = new FuncionarioCentroResultadoService(funcionarioCentroResultadoRepository);
const funcionarioCentroResultadoController = new FuncionarioCentroResultadoController(funcionarioCentroResultadoService);

funcionarioCentroResultadoRoutes.post(
  "/funcionario_centro_resultado",
  (req, res) => funcionarioCentroResultadoController.create(req, res),
);

funcionarioCentroResultadoRoutes.get(
  "/funcionario_centro_resultado/funcionario/:funcionario_id",
  (req, res) => funcionarioCentroResultadoController.getAllByFuncionarioId(req, res),
);

funcionarioCentroResultadoRoutes.get(
  "/funcionario_centro_resultado/centro_resultado/:funcionario_id",
  (req, res) =>
    funcionarioCentroResultadoController.getAllByCentroResultadoId(req, res),
);

funcionarioCentroResultadoRoutes.get(
  "/funcionario_centro_resultado/:id",
  (req, res) =>
    funcionarioCentroResultadoController.getById(req, res),
);

funcionarioCentroResultadoRoutes.get(
  "/funcionario_centro_resultado",
  (req, res) =>
    funcionarioCentroResultadoController.getAll(req, res),
);

funcionarioCentroResultadoRoutes.delete(
  "/funcionario_centro_resultado/:id",
  (req, res) => funcionarioCentroResultadoController.delete(req, res),
);


export default funcionarioCentroResultadoRoutes;
