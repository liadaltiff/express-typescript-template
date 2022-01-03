import dotenv from "dotenv";
dotenv.config();
import Express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import "./DB/mongooseConnection";
import appRouter from "./api/appRouter";

//const path = require("path");

const app = Express();

app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  console.log(req);
  next();
});
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(compression());

app.use("/api", appRouter);

const { PORT, HOST } = process.env;

if (PORT && HOST) {
  const server = app.listen(+PORT, HOST, () => {
    console.log(
      `nodejs server is running on port: ${PORT} and open to host: ${HOST}`
    );
  });
} else {
  console.log("please set PORT and HOST on .env file ");
}
