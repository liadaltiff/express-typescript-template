import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DB } = process.env;

if (DB) {
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
} else {
  console.log("please set DB on .env file ");
}
