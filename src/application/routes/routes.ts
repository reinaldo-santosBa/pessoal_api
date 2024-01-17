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

export default routes;
