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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./DB/mongooseConnection");
const appRouter_1 = __importDefault(require("./api/appRouter"));
const socket_functions_1 = require("./api/socket.functions/socket.functions");
const app = express_1.default();
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(compression_1.default());
app.use('/api', appRouter_1.default);
const { PORT, HOST } = process.env;
if (PORT && HOST) {
    const server = app.listen(+PORT, HOST, () => {
        console.log(`nodejs server is rinning on port: ${PORT} and open to host: ${HOST}`);
    });
    const io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET'],
        },
    });
    io.sockets.on('connection', (socket) => {
        socket.on('taskNotification', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield socket_functions_1.getAllTasksThatAskedForExchange();
            io.sockets.emit('getTaskNotification', res);
        }));
        socket.on('makeTaskExchange', ({ taskId, soldierId }) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield socket_functions_1.makeTaskExchange(taskId, soldierId);
            if (res) {
                io.sockets.emit('refreshTasks', {});
            }
        }));
    });
}
else {
    console.log('please set PORT and HOST on .env file ');
}
//# sourceMappingURL=server.js.map