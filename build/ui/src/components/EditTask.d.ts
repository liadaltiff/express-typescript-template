import React from 'react';
import Task from './TaskInteface';
interface EditTaskProps {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    selectedTask: Task;
    setSelectedTask: (task: Task) => void;
}
declare const EditTask: React.FC<EditTaskProps>;
export default EditTask;
//# sourceMappingURL=EditTask.d.ts.map