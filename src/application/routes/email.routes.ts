import { Router, Request, Response } from "express";
import EmailPostgresRepository from "../../infrastructure/database/email.repository";
import EmailService from "../service/email.service";
import EmailController from "../controller/email.controller";


const routesEmail = Router();

const emailRepository = new EmailPostgresRepository();
const emailService = new EmailService(emailRepository);
const emailController = new EmailController(emailService);

routesEmail.post("/email", (req: Request, res: Response) =>
  emailController.create(req, res),
);

routesEmail.delete("/email/:id", (req, res) =>
  emailController.delete(req, res)
);

routesEmail.get("/email/:pessoa_id", (req, res) =>
  emailController.getByIdPessoa(req, res)
);


routesEmail.put("/email/:id", (req, res) =>
  emailController.update(req, res),
);

export default routesEmail;
