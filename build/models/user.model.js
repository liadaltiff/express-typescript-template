"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user = new mongoose_1.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    role: Number,
}, { versionKey: false });
exports.default = mongoose_1.model('User', user);
//# sourceMappingURL=user.model.js.map