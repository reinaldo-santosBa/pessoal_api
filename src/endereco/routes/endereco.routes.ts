import { Router } from "express";
import { EnderecoController } from "../controllers/endereco.controller";
import enderecoValidations from "../validations/endereco.validations";
import { validate } from "../../application/middlewares/handleValidation";

export const routesEndereco = Router();
const enderecoController = new EnderecoController();


routesEndereco.post(
    "/endereco",
    enderecoValidations(),
    validate,
    enderecoController.create,
);






