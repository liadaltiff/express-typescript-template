import Router from "express";
import tileRouter from "./tile.controller/tile.router";
import userRouter from "./user.controller/user.router";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/tiles", tileRouter);

export default appRouter;
