import { Router } from "express";
import routesFuncionario from "./funcionario.routes";
import routesJornadaTrabalho from "./jornada.trabalho.routes";
import routesEmail from "./email.routes";
import routesCargo from "./cargo.routes";
import routesAtividade from "./atividade.routes";
import routesTelefone from "./telefone.routes";
import routesContaBancaria from "./conta.bancaria.routes";
import routesAfastamento from "./afastamento.routes";
import routesAdvertencia from "./advertencia.routes";
import routesSeeds from "./seeds.routes";
import routesEndereco from "./endereco.routes";
import routesCusta from "./custa.routes";
import routesSolicitacaoHoraExtra from "./solicitacao.hora.extra.routes";
import routesConvenio from "./convenio.routes";
import routesEncargo from "./encargo.routes";
import routesTipoAfastamento from "./tipo.afastamento.routes";
import routesDiaTrabalho from "./dia.trabalho.routes";
import routesModeloContrato from "./modelo.contrato.routes";

const routes = Router();

routes.use(routesFuncionario);
routes.use(routesJornadaTrabalho);
routes.use(routesEmail);
routes.use(routesCargo);
routes.use(routesAtividade);
routes.use(routesTelefone);
routes.use(routesContaBancaria);
routes.use(routesAfastamento);
routes.use(routesAdvertencia);
routes.use(routesSeeds);
routes.use(routesEndereco);
routes.use(routesCusta);
routes.use(routesSolicitacaoHoraExtra);
routes.use(routesConvenio);
routes.use(routesEncargo);
routes.use(routesTipoAfastamento);
routes.use(routesDiaTrabalho);
routes.use(routesModeloContrato);


export default routes;
