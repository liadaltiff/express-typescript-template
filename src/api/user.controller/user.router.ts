import Router from 'express';

import {
    getAllUsers,
    getOneUser,
    createOneUser,
    login,
} from './user.repository';

const userRouter = Router();

userRouter.route('/').get(getAllUsers).post(createOneUser);
userRouter.route('/:userId').get(getOneUser);
userRouter.route('/login').post(login);

export default userRouter;
