import React from 'react';
import Task from './TaskInteface';
interface TaskDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    sendFuncProp: () => void;
    task: Task;
    setTask: (task: Task) => void;
}
declare const TaskDialog: React.FC<TaskDialogProps>;
export default TaskDialog;
//# sourceMappingURL=taskDialog.d.ts.map