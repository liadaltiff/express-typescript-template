import React from 'react';
import Task from './TaskInteface';
interface AskExchangeProps {
    selectedTask: Task;
    setSelectedTask: (task: Task) => void;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}
declare const AskExchange: React.FC<AskExchangeProps>;
export default AskExchange;
//# sourceMappingURL=AskExchange.d.ts.map