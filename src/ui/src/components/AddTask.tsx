import React, { useContext, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import Swal from 'sweetalert2';
import displayedPersonContext from '../DisplayedPersonContext';
import Task from './TaskInteface';
import dotenv from 'dotenv';
import { parseISO } from 'date-fns';
import TaskDialog from './taskDialog';
dotenv.config();

interface AddTaskProps {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
}

const AddTask: React.FC<AddTaskProps> = ({
	tasks,
	setTasks,
	selectedDate,
	setSelectedDate,
}) => {
	const { displayedPerson } = useContext(displayedPersonContext);

	const newTaskDefault: Task = {
		name: '',
		date: selectedDate,
		startingHour: '',
		endingHour: '',
		soldierId: displayedPerson ? displayedPerson?._id : '',
	};
	const [open, setOpen] = useState(false);
	const [newTask, setNewTask] = useState<Task>(newTaskDefault);

	const addTask = () => {
		Axios.post(`/api/tasks`, {
			task: newTask,
		})
			.then((res) => {
				if (res.status === 200) {
					Swal.fire('מעולה!', 'תורנות נוספה בהצלחה!', 'success');
				} else if (res.status === 400) {
					Swal.fire('אופס!', 'תאריך לא פנוי!', 'error');
				}
				return res.data.savedTask;
			})
			.then((savedTask) => {
				savedTask.date = parseISO(savedTask.date);
				setTasks([...tasks, savedTask]);
				setSelectedDate(savedTask.date);
			})
			.catch((error) => {
				Swal.fire('אופס!', 'משהו השתבש. נסה שוב מאוחר יותר!', 'error');
			});
	};

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				aria-label="Add"
				onClick={() => setOpen(true)}
			>
				<AddIcon />
				הוסף תורנות
			</Button>
			<TaskDialog
				setTask={setNewTask}
				task={newTask}
				sendFuncProp={addTask}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
};

export default AddTask;
