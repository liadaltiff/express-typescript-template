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
exports.createOneUser = exports.login = exports.getOneUser = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({}, { _id: true, name: true, phoneNumber: true, role: true }).lean();
        return yield res.status(200).json({
            status: 200,
            error: null,
            message: 'get all users',
            users,
        });
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userById = yield user_model_1.default.findById(userId).lean();
        const reply = {
            userById,
            error: null,
            status: userById ? 200 : 404,
            user: userById
                ? `found user with id: ${userId}`
                : `user with id: ${userId} is not found`,
        };
        return yield res.status(reply.status).json(reply);
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.getOneUser = getOneUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const LoggedUser = yield user_model_1.default.findOne({
            email: email,
            password: password,
        }, { _id: true, name: true, phoneNumber: true, role: true }).lean();
        const reply = {
            LoggedUser,
            error: null,
            status: LoggedUser ? 200 : 404,
            user: LoggedUser,
            token: LoggedUser ? 'test123' : '',
        };
        return yield res.status(reply.status).json(reply);
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.login = login;
const createOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const { soldierId, name, email, phoneNumber, password, role } = user;
        if (!(soldierId && name && email && phoneNumber && password && role)) {
            throw new Error('Required data for user is missing');
        }
        const userWithSameSoliderId = yield user_model_1.default.find({
            _id: soldierId,
        });
        if (userWithSameSoliderId.length > 0) {
            return yield res.status(208).json({
                status: 208,
                error: null,
                message: 'User already created',
            });
        }
        const newUser = new user_model_1.default({
            _id: soldierId,
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            role: role,
        });
        const savedUser = yield newUser.save();
        return yield res.status(200).json({
            status: 200,
            error: null,
            message: 'one user created',
            savedUser,
        });
    }
    catch (error) {
        return yield res
            .status(500)
            .json({ status: 500, error: error.message });
    }
});
exports.createOneUser = createOneUser;
//# sourceMappingURL=user.repository.js.map