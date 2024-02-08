import { Router } from "express";
import ConvenioCidadePostgresRepository from "../../infrastructure/db/convenio.cidade.repository";
import ConvenioCidadeService from "../service/convenio.cidade.service";
import ConvenioCidadeController from "../controller/convenio.cidade.controller";

const routesConvenioCidade = Router();

const convenioCidadeRepository = new ConvenioCidadePostgresRepository();
const convenioCidadeService = new ConvenioCidadeService(convenioCidadeRepository);
const convenioCidadeController = new ConvenioCidadeController(convenioCidadeService);

routesConvenioCidade.post("/convenio_cidade", (req, res) =>
  convenioCidadeController.create(req, res)
);
routesConvenioCidade.get("/convenio_cidade/:id", (req, res) =>
  convenioCidadeController.getById(req, res),
);
routesConvenioCidade.get("/convenio_cidade", (req, res) =>
  convenioCidadeController.geAll(req, res),
);
routesConvenioCidade.put("/convenio_cidade/:id", (req, res) =>
  convenioCidadeController.update(req, res),
);

routesConvenioCidade.delete("/convenio_cidade/:id", (req, res) =>
  convenioCidadeController.delete(req, res),
);

export default routesConvenioCidade;
