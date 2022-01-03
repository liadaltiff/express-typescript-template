import { Document, Schema, model } from "mongoose";

export interface TileInterface {
  _id: string;
  color: string;
}

export interface ITile extends Document {
  color: String;
}

const tile: Schema = new Schema(
  {
    color: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default model<ITile>("Tile", tile);
