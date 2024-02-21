import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import "express-async-errors";
import Errors from "./application/middlewares/Errors";
import routes from "./application/routes/routes";

const PORT: string = process.env.PORT || "3001";

const server: Express = express();

server.use(express.json());
server.use(cors());

server.use("/api/v1",routes);
server.use(Errors);

server.listen(PORT, () => {
  console.info(`server is running in port ${PORT}`);
});

