import { Router } from "express";
import AdvertenciaPostgresRepository from "../../infrastructure/db/advertencia.repository";
import AdvertenciaService from "../service/advertencia.service";
import AdvertenciaController from "../controller/advertencia.controller";

const routesAdvertencia = Router();

const advertenciaRepository = new AdvertenciaPostgresRepository();
const advertenciaService = new AdvertenciaService(advertenciaRepository);
const advertenciaController = new AdvertenciaController(advertenciaService);

routesAdvertencia.post("/advertencia", (req, res) =>
    advertenciaController.create(req, res),
);

/*routesAdvertencia.get("/advertencia/:funcionario_id", (req, res) =>
    advertenciaController.getByIdFuncionario(req, res),
);*/

routesAdvertencia.get("/advertencia/:id", (req, res) =>
    advertenciaController.getById(req, res),
);

routesAdvertencia.get("/advertencia", (req, res) =>
    advertenciaController.getAll(req, res),
);


routesAdvertencia.put("/advertencia/:id", (req, res) =>
    advertenciaController.update(req, res),
);

routesAdvertencia.delete("/advertencia/:id", (req, res) =>
    advertenciaController.delete(req, res),
);




export default routesAdvertencia;
