import { Router } from "express";
import { GeneroController } from "../controller/generos.controller";
import { NacionalidadeController } from "../controller/nacionalidade.controller";
import { TipoBairroController } from "../controller/tipo.bairro.controller";
import { TipoContaController } from "../controller/tipo.conta.controller";
import { TipoEmailController } from "../controller/tipo.email.controller";
import { TipoLogradouroController } from "../controller/tipo.logradouro.controller";
import { TipoTelefoneController } from "../controller/tipo.telefone.controller";

const routes = Router();

routes.get("/generos", new GeneroController().find);
routes.get("/nacionalidades", new NacionalidadeController().find);
routes.get("/tipo_bairro", new TipoBairroController().find);
routes.get("/tipo_conta", new TipoContaController().find);
routes.get("/tipo_email", new TipoEmailController().find);
routes.get("/tipo_logradouro", new TipoLogradouroController().find);
routes.get("/tipo_telefone", new TipoTelefoneController().find);


export default routes;
