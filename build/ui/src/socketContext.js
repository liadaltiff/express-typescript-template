"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const socket_io_client_1 = require("socket.io-client");
const SocketContextDefaultValue = {
    socket: socket_io_client_1.io(''),
    setSocket(socket) {
        this.socket = socket;
    },
};
const SocketContext = react_1.createContext(SocketContextDefaultValue);
exports.default = SocketContext;
//# sourceMappingURL=socketContext.js.map