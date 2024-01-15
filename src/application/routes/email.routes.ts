import { Router } from "express";
import EmailPostgresRepository from "../../infrastructure/db/email.repository";
import EmailService from "../service/email.service";
import EmailController from "../controller/email.controller";

const routesEmail = Router();

const emailRepository = new EmailPostgresRepository();
const emailService = new EmailService(emailRepository);
const emailController = new EmailController(emailService);

routesEmail.post("/email/:pessoa_id", (req, res) =>
    emailController.create(req, res),
);

routesEmail.delete("/email/:id", (req, res) =>
    emailController.delete(req, res)
);

routesEmail.get("/emails", (req, res) =>
    emailController.getByIdPessoa(req,res));


export default routesEmail;
