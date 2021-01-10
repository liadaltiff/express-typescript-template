import React, { useContext, useState } from 'react';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import Swal from 'sweetalert2';
import Task from './TaskInteface';
import dotenv from 'dotenv';
import SocketContext from '../socketContext';

dotenv.config();

interface AskExchangeProps {
	selectedTask: Task;
	setSelectedTask: (task: Task) => void;
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
}
const AskExchange: React.FC<AskExchangeProps> = ({
	selectedTask,
	setSelectedTask,
	tasks,
	setTasks,
}) => {
	const [task, setTask] = useState<Task>({ ...selectedTask });
	const { socket } = useContext(SocketContext);

	const handleExchangeRequest = () => {
		Swal.fire({
			title: 'האם אתה בטוח?',
			showCancelButton: true,
			confirmButtonText: `שלח`,
			cancelButtonText: 'בטל',
			icon: 'question',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				Axios.put(
					`http://${process.env.REACT_APP_HOST}/api/tasks/askForExchange/${task._id}`
				)
					.then((res) => {
						if (res.status === 200) {
							Swal.fire('בקשה נשלחה בהצלחה!', '', 'success');
							socket.emit('taskNotification', {});
						}
					})
					.then(() => {
						const updatedTask = {
							...task,
							askedForExchange: true,
						};
						setSelectedTask(updatedTask);
						setTasks([
							...tasks.filter(
								({ _id }) => _id !== updatedTask._id
							),
							updatedTask,
						]);
					});
			}
		});
	};

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				onClick={handleExchangeRequest}
				disabled={task.askedForExchange}
			>
				בקש החלפה
			</Button>
		</>
	);
};

export default AskExchange;
