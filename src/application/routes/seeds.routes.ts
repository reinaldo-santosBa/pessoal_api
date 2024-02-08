import { Router } from "express";
import SeedsPostgresRepository from "../../infrastructure/db/seeds.repository";
import SeedsService from "../service/seeds.service";
import SeedsController from "../controller/seeds.controller";

const routesSeeds  = Router();

const seedsRepository = new SeedsPostgresRepository();
const seedsService = new SeedsService(seedsRepository);
const seedsController = new SeedsController(seedsService);


routesSeeds.get("/genero", (req, res) =>
  seedsController.findAllGenero(req,res)
);

routesSeeds.get("/estado_civil", (req, res) =>
  seedsController.findAllEstadoCivil(req, res)
);

routesSeeds.get("/tipo_email", (req, res) =>
  seedsController.findAllTipoEmail(req, res)
);

routesSeeds.get("/tipo_bairro", (req, res) =>
  seedsController.findAllTipoBairro(req, res)
);

routesSeeds.get("/tipo_telefone", (req, res) =>
  seedsController.findAllTipoTelefone(req, res)
);

routesSeeds.get("/tipo_pcd", (req, res) =>
  seedsController.findAllTipoPcd(req, res)
);


routesSeeds.get("/tipo_logradouro", (req, res) =>
  seedsController.findAllTipoLogradouro(req, res)
);

routesSeeds.get("/naturalidade", (req, res) =>
  seedsController.findAllNaturalidade(req,res)
);


routesSeeds.get("/nacionalidade", (req, res) =>
  seedsController.findAllNacionalidade(req, res)
);


routesSeeds.get("/tipo_conta", (req, res) =>
  seedsController.findAllTipoConta(req, res),
);


routesSeeds.get("/tipo_endereco", (req, res) =>
  seedsController.findAllTipoEndereco(req, res),
);



export default routesSeeds;
