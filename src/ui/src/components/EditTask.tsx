import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import TaskDialog from './taskDialog';
import Axios from 'axios';
import dotenv from 'dotenv';
import Task from './TaskInteface';
import Swal from 'sweetalert2';
dotenv.config();

interface EditTaskProps {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
	selectedTask: Task;
	setSelectedTask: (task: Task) => void;
}
const EditTask: React.FC<EditTaskProps> = ({
	tasks,
	setTasks,
	selectedTask,
	setSelectedTask,
}) => {
	const [open, setOpen] = useState(false);
	const [editedTask, setEditedTask] = useState<Task>({ ...selectedTask });

	const editTask = () => {
		Axios.put(`/api/tasks/task/${selectedTask._id}`, {
			task: editedTask,
		})
			.then((res) => {
				setOpen(false);
				return res;
			})
			.then((res) => {
				if (res.status === 200) {
					Swal.fire('מעולה!', 'תורנות נערכה!', 'success');
					setSelectedTask(editedTask);
				}
			})
			.then(() => {
				setTasks([
					...tasks.filter(({ _id }) => _id != editedTask._id),
					editedTask,
				]);
			})
			.catch(() => {
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
				<Edit />
				ערוך
			</Button>
			<TaskDialog
				setTask={setEditedTask}
				task={editedTask}
				sendFuncProp={editTask}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
};

export default EditTask;
