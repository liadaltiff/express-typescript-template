import React from 'react';
import 'react-nice-dates/build/style.css';
import Task from './TaskInteface';
interface AppCalendarProps {
    changeSelectedDate: (date: Date) => void;
    selectedDate: Date;
    tasks: Task[];
}
declare const AppCalendar: React.FC<AppCalendarProps>;
export default AppCalendar;
//# sourceMappingURL=Calender.d.ts.map