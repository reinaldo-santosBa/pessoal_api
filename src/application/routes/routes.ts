import { Router } from "express";
import routesFuncionario from "./funcionario.routes";
import routesJornadaTrabalho from "./jornada.trabalho.routes";
import routesEmail from "./email.routes";
import routesCargo from "./cargo.routes";
import routesAtividade from "./atividade.routes";
import routesTelefone from "./telefone.routes";
import routesContaBancaria from "./conta.bancaria.routes";

const routes = Router();

routes.use(routesFuncionario);
routes.use(routesJornadaTrabalho);
routes.use(routesEmail);
routes.use(routesCargo);
routes.use(routesAtividade);
routes.use(routesTelefone);
routes.use(routesContaBancaria);


export default routes;
