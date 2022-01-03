"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_repository_1 = require("./user.repository");
const userRouter = express_1.default();
userRouter.route('/').get(user_repository_1.getAllUsers).post(user_repository_1.createOneUser);
userRouter.route('/:userId').get(user_repository_1.getOneUser);
userRouter.route('/login').post(user_repository_1.login);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map