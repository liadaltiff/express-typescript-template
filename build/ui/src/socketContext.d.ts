/// <reference types="react" />
import { Socket } from 'socket.io-client';
export declare type SocketContextType = {
    socket: Socket;
    setSocket: (socket: Socket) => void;
};
declare const SocketContext: import("react").Context<SocketContextType>;
export default SocketContext;
//# sourceMappingURL=socketContext.d.ts.map