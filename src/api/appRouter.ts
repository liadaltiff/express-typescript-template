import Router from 'express';
import taskRouter from './task.controller/task.router';
import userRouter from './user.controller/user.router';

const appRouter = Router();

appRouter.use('/tasks', taskRouter);
appRouter.use('/users', userRouter);

export default appRouter;
