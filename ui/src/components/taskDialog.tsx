import React, { useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    makeStyles,
    TextField,
} from '@material-ui/core';
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Task from './TaskInteface';

const useStyles = makeStyles((theme) => ({
    taskDialogFormContainer: {
        display: 'flex',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
}));

interface TaskDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    sendFuncProp: () => void;
    task: Task;
    setTask: (task: Task) => void;
}
const TaskDialog: React.FC<TaskDialogProps> = ({
    open,
    setOpen,
    sendFuncProp,
    task,
    setTask,
}) => {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const handleSendClick = () => {
        handleClose();
        sendFuncProp();
    };

    const timeToDate = (time: string): Date | null => {
        if (time) {
            let timeDecoded = time.split(':').map((e) => +e);
            return new Date(
                Date.prototype.setHours.apply(new Date(), [
                    timeDecoded[0],
                    timeDecoded[1],
                ])
            );
        } else {
            return null;
        }
    };

    const [startingHour, setStartingHour] = useState<Date | null>(
        timeToDate(task.startingHour)
    );
    const [endingHour, setEndingHour] = useState<Date | null>(
        timeToDate(task.endingHour)
    );

    return (
        <>
            {task && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <form className={classes.taskDialogFormContainer}>
                            <TextField
                                id="standard-basic"
                                label="שם תורנות"
                                value={task.name}
                                onChange={(e) =>
                                    setTask({ ...task, name: e.target.value })
                                }
                                error={!task.name}
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    dir="ltr"
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="תאריך תורנות"
                                    format="dd/MM/yyyy"
                                    value={task.date}
                                    onChange={(e: Date | null) => {
                                        e && setTask({ ...task, date: e });
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    disablePast={true}
                                    error={!task.date}
                                />
                                <KeyboardTimePicker
                                    dir="ltr"
                                    margin="normal"
                                    id="time-picker"
                                    label="בחר שעת התחלה"
                                    value={startingHour}
                                    onChange={(e: Date | null) => {
                                        if (e) {
                                            setStartingHour(e);
                                            setTask({
                                                ...task,
                                                startingHour: e
                                                    .toLocaleTimeString('it-IT')
                                                    .slice(0, -3),
                                            });
                                        }
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    error={!startingHour}
                                />
                                <KeyboardTimePicker
                                    dir="ltr"
                                    margin="normal"
                                    id="time-picker"
                                    label="בחר שעת סיום"
                                    value={endingHour}
                                    onChange={(e: Date | null) => {
                                        if (e) {
                                            setEndingHour(e);
                                            setTask({
                                                ...task,
                                                endingHour: e
                                                    .toLocaleTimeString('it-IT')
                                                    .slice(0, -3),
                                            });
                                        }
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    error={!endingHour}
                                />
                            </MuiPickersUtilsProvider>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={handleSendClick}
                            disabled={
                                !task.name ||
                                !task.date ||
                                !task.startingHour ||
                                !task.endingHour
                            }
                        >
                            שלח
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default TaskDialog;
