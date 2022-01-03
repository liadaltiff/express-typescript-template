import React from 'react';
import Task from './TaskInteface';
interface DeleteTaskProps {
    deleteTaskFromArray: (taskToDelete: Task | undefined) => void;
    selectedTask: Task | undefined;
}
declare const DeleteTask: React.FC<DeleteTaskProps>;
export default DeleteTask;
//# sourceMappingURL=DeleteTask.d.ts.map