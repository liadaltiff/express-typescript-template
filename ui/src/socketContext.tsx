import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

export type SocketContextType = {
    socket: Socket;
    setSocket: (socket: Socket) => void;
};

const SocketContextDefaultValue: SocketContextType = {
    socket: io(''),
    setSocket(socket) {
        this.socket = socket;
    },
};

const SocketContext = createContext<SocketContextType>(
    SocketContextDefaultValue
);

export default SocketContext;
