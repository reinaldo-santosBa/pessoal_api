import { Router } from "express";
import ProcessarFolhaPagamentoPostgresRepository from "../../infrastructure/database/processar.folha.pagamento.repository";
import ProcessarFolhaPagamentoService from "../service/processar.folha.pagamento.service";
import ProcessarFolhaPagamentoController from "../controller/processar.folha.pagamento.controller";

const routesProcessarPagamento = Router();

const processarPagamentoRepository = new ProcessarFolhaPagamentoPostgresRepository();
const processarPagamentoService = new ProcessarFolhaPagamentoService(processarPagamentoRepository);
const processarPagamentoController = new ProcessarFolhaPagamentoController(processarPagamentoService);


routesProcessarPagamento.post("/processar_folha_pagamento", (req, res) =>
  processarPagamentoController.getAll(req, res)
);

export default routesProcessarPagamento;
