import { Router } from "express";
import ParametroPostgresRepository from "../../infrastructure/db/parametro.repository";
import ParametroSevice from "../service/parametro.service";
import ParametroController from "../controller/parametro.controller";

const routesParametro = Router();

const parametroRepository = new ParametroPostgresRepository();
const parametroService = new ParametroSevice(parametroRepository);
const parametroController = new ParametroController(parametroService);


routesParametro.post("/parametro", (req, res) =>
    parametroController.create(req, res)
);

routesParametro.get("/parametro", (req, res) =>
    parametroController.getAll(req, res),
);

routesParametro.put("/parametro/:id", (req, res) =>
    parametroController.update(req, res),
);

routesParametro.delete("/parametro/:id", (req, res) =>
    parametroController.delete(req, res),
);

export default routesParametro;
