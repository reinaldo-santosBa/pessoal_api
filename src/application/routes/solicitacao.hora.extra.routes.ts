import { Router } from "express";
import SolicitacaoHoraExtraPostgresRepository from "../../infrastructure/db/solicitacao.hora.extra.repository";
import SolicitacaoHoraExtraService from "../service/solicitacao.hora.extra.service";
import SolicitacaoHoraExtraController from "../controller/solicitacao.hora.extra.controller";

const routesSolicitacaoHoraExtra = Router();

const solicitacaoHoraExtraRepository = new SolicitacaoHoraExtraPostgresRepository();
const solicitacaoHoraExtraService = new SolicitacaoHoraExtraService(solicitacaoHoraExtraRepository);
const solicitacaoHoraExtraController = new SolicitacaoHoraExtraController(solicitacaoHoraExtraService);


routesSolicitacaoHoraExtra.post("/solicitacao_hora_extra", (req, res) =>
    solicitacaoHoraExtraController.create(req, res)
);

routesSolicitacaoHoraExtra.get("/solicitacao_hora_extra/:funcionario_id", (req, res) =>
    solicitacaoHoraExtraController.getAllFuncionarioId(req, res),
);

routesSolicitacaoHoraExtra.put("/solicitacao_hora_extra/:id", (req, res) =>
    solicitacaoHoraExtraController.create(req, res),
);

routesSolicitacaoHoraExtra.delete("/solicitacao_hora_extra/:id", (req, res) =>
    solicitacaoHoraExtraController.delete(req, res),
);



export default routesSolicitacaoHoraExtra;
