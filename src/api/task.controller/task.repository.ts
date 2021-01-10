import pkg from 'mongoose';
import Task from '../../models/taskModel';
import { Request, Response, NextFunction } from 'express';

export const getAllTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tasks = await Task.find().lean();

        return await res.status(200).json({
            status: 200,
            error: null,
            message: 'get all tasks',
            tasks,
        });
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};

export const getAllTasksThatAskedForExchange = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tasks = await Task.find({
            askedForExchange: true,
            date: { $gte: new Date() },
        }).lean();

        return await res.status(200).json({
            status: 200,
            error: null,
            message: 'get all tasks that avilable for exchange',
            tasks,
        });
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};

export const getAllTasksBySoldierId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { soldierId } = req.params;
        const tasks = await Task.find({ soldierId: soldierId }).lean();

        return await res.status(200).json({
            status: 200,
            error: null,
            message: 'get all tasks',
            tasks,
        });
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};

export const getOneTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { taskId } = req.params;

        const {
            Types: { ObjectId },
        } = pkg;

        if (!ObjectId.isValid(taskId)) {
            throw new Error('Required data for mongo id is missing');
        }

        const taskById = await Task.findById(taskId).lean();

        const reply = {
            taskById,
            error: null,
            status: taskById ? 200 : 404,
            task: taskById
                ? `found task with id: ${taskId}`
                : `task with id: ${taskId} is not found`,
        };

        return await res.status(reply.status).json(reply);
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};

export const askForExchange = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { taskId } = req.params;

        const {
            Types: { ObjectId },
        } = pkg;

        if (!ObjectId.isValid(taskId)) {
            throw new Error('Required data for mongo id is missing');
        }

        const taskById = await Task.updateOne(
            { _id: taskId },
            { askedForExchange: true }
        );

        const reply = {
            taskById,
            error: null,
            status: taskById ? 200 : 404,
            task: taskById
                ? `task with id: ${taskId} asking for change`
                : `task with id: ${taskId} is not found`,
        };

        return await res.status(reply.status).json(reply);
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};

export const deleteTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { taskId } = req.params;

        const {
            Types: { ObjectId },
        } = pkg;

        if (!ObjectId.isValid(taskId)) {
            throw new Error('Required data for mongo id is missing');
        }

        const taskById = await Task.findByIdAndDelete(taskId).lean();

        const reply = {
            taskById,
            error: null,
            status: taskById ? 200 : 404,
            task: taskById
                ? ` task with id: ${taskId} deleted`
                : `task with id: ${taskId} is not found`,
        };

        return await res.status(reply.status).json(reply);
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};

export const createOneTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { task } = req.body;
        const { name, soldierId, date, startingHour, endingHour } = task;
        if (!(name && soldierId && date && startingHour && endingHour)) {
            throw new Error('Required data for task is missing');
        }
        let dateBelow = new Date(date);
        dateBelow = new Date(dateBelow.toLocaleDateString('en-US')); //same date without Time.
        const taskOnSameDate = await Task.find({
            soldierId: soldierId,
            date: {
                $gte: new Date(dateBelow),
                $lt: new Date(dateBelow.setDate(dateBelow.getDate() + 1)),
            },
        });
        if (taskOnSameDate.length > 0) {
            return await res.status(400).json({
                status: 400,
                error: null,
                message: 'Date is not available',
            });
        }

        const newTask = new Task({
            name: name,
            soldierId: soldierId,
            date: date,
            startingHour: startingHour,
            endingHour: endingHour,
        });

        const savedTask = await newTask.save();

        return await res.status(200).json({
            status: 200,
            error: null,
            message: 'one task created',
            savedTask,
        });
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};

export const editTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { task } = req.body;
        const { name, soldierId, date, startingHour, endingHour, _id } = task;
        if (!(name && soldierId && date && startingHour && endingHour)) {
            throw new Error('Required data for task is missing');
        }
        const isTaskCreated = await Task.findOne({
            _id: _id,
        });
        if (!isTaskCreated) {
            return await res.status(404).json({
                status: 404,
                error: null,
                message: 'Task not found',
            });
        }

        const savedTask = await Task.updateOne(
            { _id: _id },
            {
                name: name,
                soldierId: soldierId,
                date: date,
                startingHour: startingHour,
                endingHour: endingHour,
            }
        );

        return await res.status(200).json({
            status: 200,
            error: null,
            message: 'one task updated',
            savedTask,
        });
    } catch (error) {
        return await res
            .status(500)
            .json({ status: 500, error: error.message });
    }
};
