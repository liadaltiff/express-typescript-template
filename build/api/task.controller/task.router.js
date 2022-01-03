"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_repository_1 = require("./task.repository");
const taskRouter = express_1.default();
taskRouter.route('/').get(task_repository_1.getAllTasks).post(task_repository_1.createOneTask);
taskRouter.route('/avilableForExchange').get(task_repository_1.getAllTasksThatAskedForExchange);
taskRouter
    .route('/task/:taskId')
    .get(task_repository_1.getOneTask)
    .delete(task_repository_1.deleteTaskById)
    .put(task_repository_1.editTask);
taskRouter.route('/askForExchange/:taskId').put(task_repository_1.askForExchange);
taskRouter.route('/soldiers/:soldierId').get(task_repository_1.getAllTasksBySoldierId);
exports.default = taskRouter;
//# sourceMappingURL=task.router.js.map