import { Router } from "express";
import DescontoPostgresRepository from "../../infrastructure/db/desconto.repository";
import DescontoService from "../service/desconto.service";
import DescontoController from "../controller/desconto.controller";

const routesDesconto = Router();

const descontoRepository = new DescontoPostgresRepository();
const descontoService = new DescontoService(descontoRepository);
const descontoController = new DescontoController(descontoService);



routesDesconto.post("/desconto", (req, res) =>
  descontoController.create(req, res)
);

routesDesconto.get("/desconto", (req, res) =>
  descontoController.getAll(req, res),
);

routesDesconto.get("/desconto/:id", (req, res) =>
  descontoController.getById(req, res),
);

routesDesconto.put("/desconto/:id", (req, res) =>
  descontoController.update(req, res),
);

routesDesconto.delete("/desconto/:id", (req, res) =>
  descontoController.delete(req, res),
);

export default routesDesconto;
