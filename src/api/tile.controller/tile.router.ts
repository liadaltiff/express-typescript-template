import Router from "express";

import { createTile, getAllTiles, sendTilesToServer } from "./tile.repository";

const tileRouter = Router();

tileRouter.route("/").get(getAllTiles).post(createTile);
tileRouter.route("/state").post(sendTilesToServer);
tileRouter.route("/").get(getAllTiles);
// tileRouter.route("/:userId").get(getOneUser);
// tileRouter.route("/:userId").get(getOneUser);
// tileRouter.route("/:userId").get(getOneUser);

export default tileRouter;
