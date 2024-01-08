import { Router } from "express";
import { validate } from "../../application/middlewares/handleValidation";
import EmailController from "../controller/email.controller";
import emailValidations from "../validations/email.validation";

const routesEmail = Router();
const emailController = new EmailController();


routesEmail.post(
    "/email",
    emailValidations(),
    validate,
    emailController.create,
);

export default routesEmail;
