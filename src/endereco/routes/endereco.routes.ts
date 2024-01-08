import { Router } from "express";
import { EnderecoController } from "../controllers/endereco.controller";

export const routesEndereco = Router();
const enderecoController = new EnderecoController();


routesEndereco.post("/endereco", enderecoController.create);






