import "express-async-errors";
import "dotenv/config";
import express, { Express } from "express";
import Errors from "./middlewares/Errors";
import cors from "cors";
import routes from "./routes/routes";

const PORT: string = process.env.PORT || "3001";

const server: Express = express();

server.use(express.json());
server.use(cors());

server.use(routes);
server.use(Errors);

server.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`);
});
