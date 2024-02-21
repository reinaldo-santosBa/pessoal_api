import { Router } from "express";
import HoraTrabalhadaController from "../controller/hora.trabalhada.controller";
import HoraTrabalhadaPostgresRepository from "../../infrastructure/database/hora.trabalhada.repository";
import HoraTrabalhadaService from "../service/hora.trabalhada.service";
import SolicitacaoHoraExtraPostgresRepository from "../../infrastructure/database/hora.extra.repository";
import JornadaTrabalhoPostgresRepository from "../../infrastructure/database/jornada.trabalho.repository";

const horaTrabalhadaRoutes = Router();

const horaTrabalhadaRepository = new HoraTrabalhadaPostgresRepository();
const solicitacaoHoraExtraRepository = new SolicitacaoHoraExtraPostgresRepository();
const jornadaTrabalhoRepository = new JornadaTrabalhoPostgresRepository();

const horaTrabalhadaService = new HoraTrabalhadaService(horaTrabalhadaRepository, solicitacaoHoraExtraRepository, jornadaTrabalhoRepository);
const horaTrabalhadaController = new HoraTrabalhadaController(horaTrabalhadaService);


horaTrabalhadaRoutes.post("/hora_trabalhada", (req, res) =>
  horaTrabalhadaController.create(req, res)
);

horaTrabalhadaRoutes.get("/hora_trabalhada/:funcionario_id", (req, res) =>
  horaTrabalhadaController.getAllByFuncionario(req, res),
);

/*horaTrabalhadaRoutes.get("/hora_trabalhada/:id", (req, res) =>
    horaTrabalhadaController.getById(req, res),
);
*/
horaTrabalhadaRoutes.put("/hora_trabalhada/:id", (req, res) =>
  horaTrabalhadaController.update(req, res),
);

horaTrabalhadaRoutes.delete("/hora_trabalhada/:id", (req, res) =>
  horaTrabalhadaController.delete(req, res),
);


export default horaTrabalhadaRoutes;
