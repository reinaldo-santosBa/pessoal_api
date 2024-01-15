import { Router } from "express";
import PessoaController from "../controller/pessoa.controller";
import PessoaService from "../service/funcionario.service";
import FuncionarioPostgresRepository from "../../infrastructure/db/funcionario.repository";

const routesFuncionario = Router();

const funcionarioRepository = new FuncionarioPostgresRepository();
const funcionarioService = new PessoaService(funcionarioRepository);
const funcionarioController = new PessoaController(funcionarioService);

routesFuncionario.post("/funcionario", (req, res) =>
    funcionarioController.create(req, res),
);

export default routesFuncionario;
