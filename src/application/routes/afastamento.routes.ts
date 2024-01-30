import { Router } from "express";
import AfastamentoPostgresRepository from "../../infrastructure/db/afastamento.repository";
import AfastamentoService from "../service/afastamento.service";
import AfastamentoController from "../controller/afastamento.controller";

const routesAfastamento = Router();

const afastamentoRepository = new AfastamentoPostgresRepository();
const afastamentoService = new AfastamentoService(afastamentoRepository);
const afastamentoController = new AfastamentoController(afastamentoService);

routesAfastamento.post("/afastamento", (req, res) =>
    afastamentoController.create(req, res),
);

/*routesAfastamento.get("/afastamento/:funcionario_id", (req, res) =>
    afastamentoController.getByIdFuncionario(req, res),
);*/

routesAfastamento.get("/afastamento/:id", (req, res) =>
    afastamentoController.getById(req, res),
);

routesAfastamento.get("/afastamento", (req, res) =>
    afastamentoController.getAll(req, res),
);


routesAfastamento.put("/afastamento/:id", (req, res) =>
    afastamentoController.update(req, res),
);

routesAfastamento.delete("/afastamento/:id", (req, res) =>
    afastamentoController.delete(req, res),
);

export default routesAfastamento;
