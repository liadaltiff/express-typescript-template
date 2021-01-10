import dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import './DB/mongooseConnection';
import appRouter from './api/appRouter';
import { Socket } from 'socket.io';
import {
    getAllTasksThatAskedForExchange,
    makeTaskExchange,
} from './api/socket.functions/socket.functions';

const app = Express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(compression());

app.use('/api', appRouter);

const { PORT, HOST } = process.env;

if (PORT && HOST) {
    const server = app.listen(+PORT, HOST, () => {
        console.log(
            `nodejs server is rinning on port: ${PORT} and open to host: ${HOST}`
        );
    });

    const io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET'],
        },
    });
    io.sockets.on('connection', (socket: Socket) => {
        console.log("user connected")
        socket.on('taskNotification', async (data) => {
            const res = await getAllTasksThatAskedForExchange();
            io.sockets.emit('getTaskNotification', res);
        });
        socket.on('makeTaskExchange', async ({ taskId, soldierId }) => {
            const res = await makeTaskExchange(taskId, soldierId);
            if (res) {
                const res = await getAllTasksThatAskedForExchange();
                io.sockets.emit('getTaskNotification', res);
                io.sockets.emit('refreshTasks', {});
            }
        });
    });
} else {
    console.log('please set PORT and HOST on .env file ');
}
