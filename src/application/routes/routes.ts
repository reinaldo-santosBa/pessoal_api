import { Router } from "express";
import { routesEndereco } from "../../endereco/routes/endereco.routes";

const routes = Router();

routes.use(routesEndereco);

export default routes;
