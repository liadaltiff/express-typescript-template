import { Document, Schema, model } from 'mongoose';
import { IUser } from './user.model';

export interface ITask {
    name: string;
    soldierId: string;
    date: Date;
    startingHour: string;
    endingHour: string;
    askedForExchange: boolean;
}
export interface TaskDocument extends ITask, Document {}

const task: Schema = new Schema(
    {
        name: String,
        soldierId: String,
        date: Date,
        startingHour: String,
        endingHour: String,
        askedForExchange: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
);

const Task = model<TaskDocument>('Task', task);

export default Task;
