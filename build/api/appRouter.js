"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_router_1 = __importDefault(require("./task.controller/task.router"));
const user_router_1 = __importDefault(require("./user.controller/user.router"));
const appRouter = express_1.default();
appRouter.use('/tasks', task_router_1.default);
appRouter.use('/users', user_router_1.default);
exports.default = appRouter;
//# sourceMappingURL=appRouter.js.map