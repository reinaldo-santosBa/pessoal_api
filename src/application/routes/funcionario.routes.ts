import { Router } from "express";
import FuncionarioPostgresRepository from "../../infrastructure/db/funcionario.repository";
import FuncionarioController from "../controller/funcionario.controller";
import FuncionarioService from "../service/funcionario.service";

const routesFuncionario = Router();

const funcionarioRepository = new FuncionarioPostgresRepository();
const funcionarioService = new FuncionarioService(funcionarioRepository);
const funcionarioController = new FuncionarioController(funcionarioService);

routesFuncionario.post("/funcionario", (req, res) =>
    funcionarioController.create(req, res),
);

routesFuncionario.get("/funcionario", (req, res) =>
    funcionarioController.getAll(req, res),
);

export default routesFuncionario;
