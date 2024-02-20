import { Router } from "express";
import FolhaPagamentoService from "../service/folha.pagamento.service";
import FolhaPagamentoController from "../controller/folha.pagamento.controller";
import FolhaPagamentoPostgresRepository from "../../infrastructure/db/folha_pagamento/folha.pagamento.repository";

const routesFolhaPagamento = Router();

const folhaPagamentoRepository = new FolhaPagamentoPostgresRepository();
const folhaPagamentoService = new FolhaPagamentoService(folhaPagamentoRepository);
const folhaPagamentoController = new FolhaPagamentoController(folhaPagamentoService);


routesFolhaPagamento.post("/folha_pagamento", (req, res) =>
  folhaPagamentoController.create(req, res)
);


export default routesFolhaPagamento;
