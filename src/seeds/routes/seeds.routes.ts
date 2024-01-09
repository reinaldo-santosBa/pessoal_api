import { Router } from "express";
import { GeneroController } from "../controller/generos.controller";
import { NacionalidadeController } from "../controller/nacionalidade.controller";
import { TipoBairroController } from "../controller/tipo.bairro.controller";
import { TipoContaController } from "../controller/tipo.conta.controller";
import { TipoEmailController } from "../controller/tipo.email.controller";
import { TipoLogradouroController } from "../controller/tipo.logradouro.controller";
import { TipoTelefoneController } from "../controller/tipo.telefone.controller";

const routesSeeds = Router();

routesSeeds.get("/generos", new GeneroController().find);
routesSeeds.get("/nacionalidades", new NacionalidadeController().find);
routesSeeds.get("/tipo_bairro", new TipoBairroController().find);
routesSeeds.get("/tipo_conta", new TipoContaController().find);
routesSeeds.get("/tipo_email", new TipoEmailController().find);
routesSeeds.get("/tipo_logradouro", new TipoLogradouroController().find);
routesSeeds.get("/tipo_telefone", new TipoTelefoneController().find);


export default routesSeeds;
