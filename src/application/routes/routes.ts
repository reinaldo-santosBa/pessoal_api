import { Router } from "express";
import routesFuncionario from "./funcionario.routes";
import routesJornadaTrabalho from "./jornada.trabalho.routes";
import routesEmail from "./email.routes";
import routesCargo from "./cargo.routes";

const routes = Router();

routes.use(routesFuncionario);
routes.use(routesJornadaTrabalho);
routes.use(routesEmail);
routes.use(routesCargo);

export default routes;
