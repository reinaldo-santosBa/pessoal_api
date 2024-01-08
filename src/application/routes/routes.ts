import { Router } from "express";
import { routesEndereco } from "../../endereco/routes/endereco.routes";
import cargoRoutes from "../../cargo/routes/cargo.routes";
import routesEmail from "../../email/routes/email.routes";

const routes = Router();

routes.use(routesEndereco);
routes.use(cargoRoutes);
routes.use(routesEmail);


export default routes;
