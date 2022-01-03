import Tile, { ITile, TileInterface } from "../../models/tile.model";
import { Request, Response, NextFunction } from "express";

export const getAllTiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tiles = await Tile.find();

    return await res.status(200).json({
      status: 200,
      message: "Get All Tiles",
      tiles,
    });
  } catch (error: any) {
    return await res.status(500).json({ status: 500, error: error.message });
  }
};

export const sendTilesToServer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { stateTiles } = req.body;
    const { addedTiles } = req.body;
    const { updatedTiles } = req.body;
    const { deletedTiles } = req.body;

    if (!stateTiles) {
      throw new Error("Tiles Info Is Missing");
    }

    const dbTiles = await Tile.find();

    const addActions = addedTiles.map((tile: ITile) => {
      return {
        insertOne: {
          document: tile,
        },
      };
    });

    const updateActions = updatedTiles.map((tile: ITile) => {
      return {
        updateOne: {
          filter: { _id: tile._id },
          update: { color: tile.color },
          options: { upsert: false, useFindAndModify: false },
        },
      };
    });

    const deleteActions = deletedTiles.map((tile: ITile) => {
      return {
        deleteOne: {
          filter: { _id: tile._id },
        },
      };
    });

    const newArray = addActions.concat(updateActions).concat(deleteActions);

    Tile.bulkWrite(newArray);
    // addedTiles.forEach(async (tile: ITile) => {
    //   await new Tile({ color: tile.color }).save();
    // });

    // updatedTiles.forEach(async (updatedTile: ITile) => {
    //   await Tile.findOneAndUpdate(
    //     { _id: updatedTile._id },
    //     { color: updatedTile.color },
    //     { upsert: false, useFindAndModify: false }
    //   ).exec();
    // });

    // deletedTiles.forEach(async (tile: { _id: any; color: any }) => {
    //   await Tile.findOneAndDelete({ _id: tile._id }).exec();
    // });

    const newDBTiles = await Tile.find();

    return res.status(200).json({
      newDBTiles,
    });
  } catch (error: any) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

export const getOneTile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tileId } = req.params;
    const tileById = await Tile.findById(tileId).lean();

    const reply = {
      tileById,
      error: null,
      status: tileById ? 200 : 404,
      tile: tileById
        ? `found tile with id: ${tileId}`
        : `tile with id: ${tileId} is not found`,
    };

    return await res.status(reply.status).json(reply);
  } catch (error: any) {
    return await res.status(500).json({ status: 500, error: error.message });
  }
};

export const createTile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTile = new Tile({
      color: "#F9D5A7",
    });
    const savedTile = await newTile.save();

    return await res.status(200).json({
      status: 200,
      message: "created tile",
      savedTile,
    });
  } catch (error: any) {
    return await res.status(500).json({ status: 500, error: error.message });
  }
};
