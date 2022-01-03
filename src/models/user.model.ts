import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  fullName: String;
  email: String;
  password: String;
  role: String;
}

const user: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default model<IUser>("User", user);
