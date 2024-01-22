import { Router } from "express";
import EncargoPostgresRepository from "../../infrastructure/db/encargo.repository";
import EncargoController from "../controller/encargo.controller";
import EncargoService from "../service/encargo.service";

const routesEncargo = Router();

const encargoRepository = new EncargoPostgresRepository();
const encargoService = new EncargoService(encargoRepository);
const encargoController = new EncargoController(encargoService);

routesEncargo.post("/encargo", (req, res) =>
    encargoController.create(req, res),
);

routesEncargo.get("/encargo", (req, res) => encargoController.getAll(req, res));

routesEncargo.put("/encargo/:id", (req, res) =>
    encargoController.update(req, res),
);

routesEncargo.delete("/encargo/:id", (req, res) =>
    encargoController.delete(req, res),
);

export default routesEncargo;
