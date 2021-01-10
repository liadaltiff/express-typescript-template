import Task, { ITask } from '../../models/taskModel';

export const getAllTasksThatAskedForExchange = () => {
    try {
        const tasks = Task.find({
            askedForExchange: true,
            date: { $gte: new Date() },
        }).lean();

        return tasks;
    } catch (error) {
        return error.message;
    }
};

export const makeTaskExchange = async (
    taskId: string,
    newSoldierId: string
) => {
    try {
        const updated = await Task.updateOne(
            { _id: taskId },
            { soldierId: newSoldierId, askedForExchange: false }
        );
        return updated;
    } catch (error) {
        return false;
    }
};
