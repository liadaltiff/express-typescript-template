import React, { useEffect, useMemo, useState } from 'react';
import { isSameDay, isBefore } from 'date-fns';
import { he } from 'date-fns/locale';
import {
    DatePickerCalendar,
    DateChangeCallBack,
    Modifiers,
} from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import Task from './TaskInteface';

interface AppCalendarProps {
    changeSelectedDate: (date: Date) => void;
    selectedDate: Date;
    tasks: Task[];
}

const AppCalendar: React.FC<AppCalendarProps> = ({
    changeSelectedDate,
    selectedDate,
    tasks,
}) => {
    const selectedDates = useMemo(() => tasks.map((task) => task.date), [
        tasks,
    ]);
    const modifiers: Modifiers = {
        taskDay: (date) =>
            selectedDates.some((selectedDate) => isSameDay(selectedDate, date)),
        disabled: (date) =>
            isBefore(date, new Date()) &&
            !isSameDay(date, new Date()) &&
            !selectedDates.some((selectedDate) =>
                isSameDay(selectedDate, date)
            ),
    };
    const modifiersClassNames = {
        taskDay: '-taskDay',
    };
    const handleDayClick: DateChangeCallBack = (date) =>
        date && changeSelectedDate(date);

    return (
        <div>
            <DatePickerCalendar
                date={selectedDate}
                onDateChange={handleDayClick}
                locale={he}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
            />
        </div>
    );
};

export default AppCalendar;
