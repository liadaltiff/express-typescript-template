import Router from 'express';

import {
    getAllTasks,
    getOneTask,
    createOneTask,
    getAllTasksBySoldierId,
    getAllTasksThatAskedForExchange,
    deleteTaskById,
    askForExchange,
    editTask,
} from './task.repository';

const taskRouter = Router();

taskRouter.route('/').get(getAllTasks).post(createOneTask);
taskRouter.route('/avilableForExchange').get(getAllTasksThatAskedForExchange);
taskRouter
    .route('/task/:taskId')
    .get(getOneTask)
    .delete(deleteTaskById)
    .put(editTask);
taskRouter.route('/askForExchange/:taskId').put(askForExchange);
taskRouter.route('/soldiers/:soldierId').get(getAllTasksBySoldierId);

export default taskRouter;
