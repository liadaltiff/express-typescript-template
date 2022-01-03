"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB } = process.env;
if (DB) {
    mongoose_1.default.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose_1.default.connection.once('open', () => {
        console.log('MongoDB database connection established successfully');
    });
}
else {
    console.log('please set DB on .env file ');
}
//# sourceMappingURL=mongooseConnection.js.map