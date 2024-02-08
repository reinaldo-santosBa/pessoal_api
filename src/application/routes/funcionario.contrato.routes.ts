import { Router } from "express";
import FuncionarioContratoService from "../service/funcionario.contrato.service";
import FuncionarioContratoController from "../controller/funcionario.contrato.controller";
import FuncionarioContratoPostgresRepository from "../../infrastructure/db/funcionario.contrato.repository";

const routesFuncionarioContrato = Router();

const funcionarioContratoRepository = new FuncionarioContratoPostgresRepository();
const funcionarioContratoService = new FuncionarioContratoService(funcionarioContratoRepository);
const funcionarioContratoController = new FuncionarioContratoController(funcionarioContratoService);

routesFuncionarioContrato.post("/funcionario_contrato", (req, res) =>
  funcionarioContratoController.create(req, res),
);

routesFuncionarioContrato.get("/funcionario_contrato/:funcionario_id", (req, res) =>
  funcionarioContratoController.getByIdFuncionario(req, res),
);

routesFuncionarioContrato.put("/funcionario_contrato/:id", (req, res) =>
  funcionarioContratoController.update(req, res),
);

routesFuncionarioContrato.delete("/funcionario_contrato/:id", (req, res) =>
  funcionarioContratoController.delete(req, res),
);

export default routesFuncionarioContrato;
