import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Calendar from './Calender';
import Task, { DecodedTask } from './TaskInteface';
import { isSameDay, parseISO } from 'date-fns';
import Axios from 'axios';
import TaskDetails from './taskDetails';
import displayedPresonContext from '../DisplayedPersonContext';
import userContext from '../userContext';
import Roles from './Roles';
import AddTask from './AddTask';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';
import AskExchange from './AskExchange';
import SocketContext from '../socketContext';

const useStyles = makeStyles((theme) => ({
    displayedInfoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

const DisplayedInfo: React.FC = () => {
    const { socket } = useContext(SocketContext);
    const classes = useStyles();

    const [selectedDate, changeSelectedDate] = useState<Date>(new Date());
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(
        undefined
    );
    const { displayedPerson } = useContext(displayedPresonContext);
    const { user } = useContext(userContext);

    const getTasks = () => {
        if (displayedPerson) {
            const { REACT_APP_HOST } = process.env;
            Axios.get<{ tasks: DecodedTask[] }>(
                `http://${REACT_APP_HOST}/api/tasks/soldiers/${displayedPerson._id}`
            )
                .then((res) => res.data.tasks)
                .then((tasks) =>
                    tasks.map(
                        (task) =>
                            ({ ...task, date: parseISO(task.date) } as Task)
                    )
                )
                .then((tasks) => {
                    setTasks(tasks);
                });
        }
    };
    socket.on('refreshTasks', () => {
        getTasks();
        console.log('refreshing tasks');
    });

    useEffect(() => {
        setSelectedTask(
            tasks.find(
                (task) => selectedDate && isSameDay(task.date, selectedDate)
            )
        );
    }, [selectedDate]);

    useEffect(() => {
        getTasks();
        setSelectedTask(undefined);
        changeSelectedDate(new Date());
    }, [displayedPerson]);

    const deleteTaskFromArray = (taskToDelete: Task | undefined) => {
        if (taskToDelete) {
            setTasks(tasks.filter((task) => task._id !== taskToDelete._id));
        }
        setSelectedTask(undefined);
    };

    const DetailsSection = () => {
        if (selectedTask) {
            return (
                <>
                    <TaskDetails selectedTask={selectedTask} />
                    <AskExchange
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                    {user?.role === Roles.Admin && (
                        <DeleteTask
                            selectedTask={selectedTask}
                            deleteTaskFromArray={deleteTaskFromArray}
                        />
                    )}
                    {user?.role === Roles.Admin && (
                        <EditTask
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                    )}
                </>
            );
        } else if (user?.role === Roles.Admin) {
            return (
                <AddTask
                    tasks={tasks}
                    setTasks={setTasks}
                    selectedDate={selectedDate}
                    setSelectedDate={changeSelectedDate}
                />
            );
        } else {
            return null;
        }
    };

    return (
        <div>
            <Grid
                container
                spacing={0}
                className={classes.displayedInfoContainer}
            >
                <Grid item xs={8} style={{ maxWidth: 50 + '%' }}>
                    <div dir="rtl">
                        <Calendar
                            tasks={tasks}
                            selectedDate={selectedDate}
                            changeSelectedDate={changeSelectedDate}
                        />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <DetailsSection />
                </Grid>
            </Grid>
        </div>
    );
};

export default DisplayedInfo;
