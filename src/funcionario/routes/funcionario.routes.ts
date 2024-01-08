import { Router } from "express";
import FuncionarioController from "../controller/funcionario.controller";

export const funcionarioRoutes = Router();

const funcionarioController = new FuncionarioController();


funcionarioRoutes.post("/funcionario", funcionarioController.create);
