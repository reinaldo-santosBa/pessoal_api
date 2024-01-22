import { Router } from "express";
import EnderecoPostgresRepository from "../../infrastructure/db/endereco.repository";
import EnderecoService from "../service/endereco.service";
import EnderecoController from "../controller/endereco.controller";

const routesEndereco = Router();

const enderecoRepository = new EnderecoPostgresRepository();
const enderecoService = new EnderecoService(enderecoRepository);
const enderecoController = new EnderecoController(enderecoService);


routesEndereco.post("/endereco", (req, res) =>
    enderecoController.create(req, res),
);

routesEndereco.get("/endereco/:pessoa_id", (req, res) =>
    enderecoController.getByIdPessoa(req, res)
);


routesEndereco.get("/regioes", (req, res) =>
    enderecoController.getRegioes(req, res)
);


routesEndereco.get("/estados/:regiao_id", (req, res) =>
    enderecoController.getEstados(req, res)
);


routesEndereco.get("/cidades/:estado_id", (req, res) =>
    enderecoController.getCidades(req, res)
);


routesEndereco.get("/bairros/:cidade_id", (req, res) =>
    enderecoController.getBairros(req, res)
);


routesEndereco.put("/endereco/:id", (req, res) =>
    enderecoController.update(req,res)
);


routesEndereco.delete("/endereco/:id", (req, res) =>
    enderecoController.delete(req, res)
);


export default routesEndereco;
