"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const task = new mongoose_1.Schema({
    name: String,
    soldierId: String,
    date: Date,
    startingHour: String,
    endingHour: String,
    askedForExchange: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false });
const Task = mongoose_1.model('Task', task);
exports.default = Task;
//# sourceMappingURL=taskModel.js.map