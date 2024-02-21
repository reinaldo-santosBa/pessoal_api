import { Router } from "express";
import TipoRemuneracaoPostgresRepository from "../../infrastructure/database/tipo.remuneracao.repostory";
import TipoRemuneracaoService from "../service/tipo.remuneracao.service";
import TipoRemuneracaoController from "../controller/tipo.remuneracao.controller";


const routesTipoRemuneracao = Router();

const tipoRemuneracaoRepository = new TipoRemuneracaoPostgresRepository();
const tipoRemuneracaoService = new TipoRemuneracaoService(tipoRemuneracaoRepository);
const tipoRemuneracaoController = new TipoRemuneracaoController(tipoRemuneracaoService);

routesTipoRemuneracao.post("/tipo_remuneracao", (req, res) =>
  tipoRemuneracaoController.create(req, res),
);

routesTipoRemuneracao.get("/tipo_remuneracao", (req, res) =>
  tipoRemuneracaoController.getAll(req, res),
);


routesTipoRemuneracao.get("/tipo_remuneracao/:id", (req, res) =>
  tipoRemuneracaoController.getById(req, res),
);


routesTipoRemuneracao.put("/tipo_remuneracao/:id", (req, res) =>
  tipoRemuneracaoController.update(req, res),
);

routesTipoRemuneracao.delete("/tipo_remuneracao/:id", (req, res) =>
  tipoRemuneracaoController.delete(req, res),
);

export default routesTipoRemuneracao;
