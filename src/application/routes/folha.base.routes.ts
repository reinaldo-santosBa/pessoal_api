import { Router } from "express";
import FolhaBasePostgresRepository from "../../infrastructure/db/folha/folha.base.repository";
import FolhaBaseController from "../controller/folha.base.controller";
import FolhaBaseService from "../service/folha.base.service";


const routesFolhaBase = Router();


const folhaBaseRepository = new FolhaBasePostgresRepository();

const folhaBaseService = new FolhaBaseService(
  folhaBaseRepository
);

const folhaBaseController = new FolhaBaseController(folhaBaseService);

routesFolhaBase.post("/folha_base", (req, res) =>
  folhaBaseController.create(req, res)
);




export default routesFolhaBase;
