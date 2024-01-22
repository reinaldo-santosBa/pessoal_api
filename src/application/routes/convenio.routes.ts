import { Router } from "express";
import ConvenioPostgresRepository from "../../infrastructure/db/convenio.repository";
import ConvenioService from "../service/convenio.service";
import ConvenioController from "../controller/convenio.controller";

const routesConvenio = Router();

const convenioRepository = new ConvenioPostgresRepository();
const convenioService = new ConvenioService(convenioRepository);
const convenioController = new ConvenioController(convenioService);


routesConvenio.post("/convenio", (req, res) =>
    convenioController.create(req, res)
);

routesConvenio.get("/convenio", (req, res) =>
    convenioController.getAll(req, res)
);

routesConvenio.put("/convenio/:id", (req, res) =>
    convenioController.update(req, res)
);

routesConvenio.delete("/convenio/:id", (req, res) =>
    convenioController.delete(req, res),
);


export default routesConvenio;
