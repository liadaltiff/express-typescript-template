"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTask = exports.createOneTask = exports.deleteTaskById = exports.askForExchange = exports.getOneTask = exports.getAllTasksBySoldierId = exports.getAllTasksThatAskedForExchange = exports.getAllTasks = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskModel_1 = __importDefault(require("../../models/taskModel"));
const getAllTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskModel_1.default.find().lean();
        return yield res.status(200).json({
            status: 200,
            error: null,
            message: 'get all tasks',
            tasks,
        });
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.getAllTasks = getAllTasks;
const getAllTasksThatAskedForExchange = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskModel_1.default.find({
            askedForExchange: true,
            date: { $gte: new Date() },
        }).lean();
        return yield res.status(200).json({
            status: 200,
            error: null,
            message: 'get all tasks that avilable for exchange',
            tasks,
        });
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.getAllTasksThatAskedForExchange = getAllTasksThatAskedForExchange;
const getAllTasksBySoldierId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { soldierId } = req.params;
        const tasks = yield taskModel_1.default.find({ soldierId: soldierId }).lean();
        return yield res.status(200).json({
            status: 200,
            error: null,
            message: 'get all tasks',
            tasks,
        });
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.getAllTasksBySoldierId = getAllTasksBySoldierId;
const getOneTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const { Types: { ObjectId }, } = mongoose_1.default;
        if (!ObjectId.isValid(taskId)) {
            throw new Error('Required data for mongo id is missing');
        }
        const taskById = yield taskModel_1.default.findById(taskId).lean();
        const reply = {
            taskById,
            error: null,
            status: taskById ? 200 : 404,
            task: taskById
                ? `found task with id: ${taskId}`
                : `task with id: ${taskId} is not found`,
        };
        return yield res.status(reply.status).json(reply);
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.getOneTask = getOneTask;
const askForExchange = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const { Types: { ObjectId }, } = mongoose_1.default;
        if (!ObjectId.isValid(taskId)) {
            throw new Error('Required data for mongo id is missing');
        }
        const taskById = yield taskModel_1.default.updateOne({ _id: taskId }, { askedForExchange: true });
        const reply = {
            taskById,
            error: null,
            status: taskById ? 200 : 404,
            task: taskById
                ? `task with id: ${taskId} asking for change`
                : `task with id: ${taskId} is not found`,
        };
        return yield res.status(reply.status).json(reply);
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.askForExchange = askForExchange;
const deleteTaskById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const { Types: { ObjectId }, } = mongoose_1.default;
        if (!ObjectId.isValid(taskId)) {
            throw new Error('Required data for mongo id is missing');
        }
        const taskById = yield taskModel_1.default.findByIdAndDelete(taskId).lean();
        const reply = {
            taskById,
            error: null,
            status: taskById ? 200 : 404,
            task: taskById
                ? ` task with id: ${taskId} deleted`
                : `task with id: ${taskId} is not found`,
        };
        return yield res.status(reply.status).json(reply);
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.deleteTaskById = deleteTaskById;
const createOneTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task } = req.body;
        const { name, soldierId, date, startingHour, endingHour } = task;
        if (!(name && soldierId && date && startingHour && endingHour)) {
            throw new Error('Required data for task is missing');
        }
        let dateBelow = new Date(date);
        dateBelow = new Date(dateBelow.toLocaleDateString('en-US')); //same date without Time.
        const taskOnSameDate = yield taskModel_1.default.find({
            soldierId: soldierId,
            date: {
                $gte: new Date(dateBelow),
                $lt: new Date(dateBelow.setDate(dateBelow.getDate() + 1)),
            },
        });
        if (taskOnSameDate.length > 0) {
            return yield res.status(400).json({
                status: 400,
                error: null,
                message: 'Date is not available',
            });
        }
        const newTask = new taskModel_1.default({
            name: name,
            soldierId: soldierId,
            date: date,
            startingHour: startingHour,
            endingHour: endingHour,
        });
        const savedTask = yield newTask.save();
        return yield res.status(200).json({
            status: 200,
            error: null,
            message: 'one task created',
            savedTask,
        });
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.createOneTask = createOneTask;
const editTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task } = req.body;
        const { name, soldierId, date, startingHour, endingHour, _id } = task;
        if (!(name && soldierId && date && startingHour && endingHour)) {
            throw new Error('Required data for task is missing');
        }
        const isTaskCreated = yield taskModel_1.default.findOne({
            _id: _id,
        });
        if (!isTaskCreated) {
            return yield res.status(404).json({
                status: 404,
                error: null,
                message: 'Task not found',
            });
        }
        const savedTask = yield taskModel_1.default.updateOne({ _id: _id }, {
            name: name,
            soldierId: soldierId,
            date: date,
            startingHour: startingHour,
            endingHour: endingHour,
        });
        return yield res.status(200).json({
            status: 200,
            error: null,
            message: 'one task updated',
            savedTask,
        });
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.editTask = editTask;
//# sourceMappingURL=task.repository.js.map