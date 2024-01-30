import { Router, Request, Response } from "express";
import CargoPostgresRepository from "../../infrastructure/db/cargo.repository";
import CargosService from "../service/cargos.service";
import CargoController from "../controller/cargo.controller";

const routesCargo = Router();

const cargoRepository = new CargoPostgresRepository();
const cargoService = new CargosService(cargoRepository);
const cargoController = new CargoController(cargoService);

routesCargo.post("/cargo", (req: Request, res: Response) =>
    cargoController.create(req, res),
);

routesCargo.get("/cargo", (req, res) =>
    cargoController.getAll(req, res)
);

routesCargo.get("/cargo/:id", (req, res) =>
    cargoController.getById(req, res)
);

routesCargo.put("/cargo/:id", (req, res) =>
    cargoController.update(req, res)
);

routesCargo.delete("/cargo/:id", (req, res) =>
    cargoController.delete(req, res),
);

export default routesCargo;
