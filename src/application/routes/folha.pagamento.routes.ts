import { Router } from "express";
import FolhaPagamentoService from "../service/folha.pagamento.service";
import FolhaPagamentoController from "../controller/folha.pagamento.controller";
import FolhaPagamentoPostgresRepository from "../../infrastructure/database/folha_pagamento/folha.pagamento.repository";
import FolhaBasePostgresRepository from "../../infrastructure/database/folha_base/folha.base.repository";

const routesFolhaPagamento = Router();

const folhaPagamentoRepository = new FolhaPagamentoPostgresRepository();
const folhaBaseRepository = new FolhaBasePostgresRepository();

const folhaPagamentoService = new FolhaPagamentoService(
  folhaPagamentoRepository,
  folhaBaseRepository,
);
const folhaPagamentoController = new FolhaPagamentoController(folhaPagamentoService);


routesFolhaPagamento.post("/folha_pagamento", (req, res) =>
  folhaPagamentoController.create(req, res)
);


export default routesFolhaPagamento;
