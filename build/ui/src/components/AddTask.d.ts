import React from 'react';
import Task from './TaskInteface';
interface AddTaskProps {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}
declare const AddTask: React.FC<AddTaskProps>;
export default AddTask;
//# sourceMappingURL=AddTask.d.ts.map