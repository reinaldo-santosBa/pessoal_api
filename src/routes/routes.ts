import { Router } from "express";
import AppError from "../errors/AppError";

const routes = Router();


routes.get("/users", () => {
    throw new AppError("teste", 400);
});

export default routes;
