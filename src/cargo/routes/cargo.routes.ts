import { Router } from "express";
import { CargoController } from "../controllers/cargo.controller";
import { validate } from "../../application/middlewares/handleValidation";
import cargoValidations from "../validations/cargo.validations";

const cargoRoutes = Router();
const cargoController = new CargoController();

cargoRoutes.post(
    "/cargo",
    cargoValidations(),
    validate,
    cargoController.create,
);

export default cargoRoutes;
