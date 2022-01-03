import { Document } from 'mongoose';
export interface ITask {
    name: string;
    soldierId: string;
    date: Date;
    startingHour: string;
    endingHour: string;
    askedForExchange: boolean;
}
export interface TaskDocument extends ITask, Document {
}
declare const Task: import("mongoose").Model<TaskDocument>;
export default Task;
//# sourceMappingURL=taskModel.d.ts.map