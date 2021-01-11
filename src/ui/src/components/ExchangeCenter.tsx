import React, { useContext, useEffect, useState, useRef } from 'react';
import {
	Badge,
	Dialog,
	DialogContent,
	IconButton,
	makeStyles,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Axios from 'axios';
import Task, { DecodedTask } from './TaskInteface';
import { parseISO } from 'date-fns';
import displayedPersonContext from '../DisplayedPersonContext';
import dotenv from 'dotenv';
import SocketContext from '../socketContext';
import ExchangeCard from './ExchangeCard';
dotenv.config();

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex',
		alignItems: 'center',
		alignContent: 'space-between',
	},
}));

const ExchangeCenter: React.FC = () => {
	const { socket } = useContext(SocketContext);
	const classes = useStyles();

	const { displayedPerson } = useContext(displayedPersonContext);
	const [open, setOpen] = useState(false);
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		Axios.get<{ tasks: DecodedTask[] }>(`/api/tasks/avilableForExchange`)
			.then((res) => res.data.tasks)
			.then((tasks) =>
				tasks.map(
					(task) => ({ ...task, date: parseISO(task.date) } as Task)
				)
			)
			.then((tasks) => {
				if (displayedPerson)
					return tasks.filter(
						(task: Task) => task.soldierId !== displayedPerson?._id
					);
				return tasks;
			})
			.then((tasks) =>
				tasks.sort(
					(a: Task, b: Task) => a.date.valueOf() - b.date.valueOf()
				)
			)
			.then((tasks) => {
				setTasks(tasks);
			});
	}, [displayedPerson]);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleExchange = (task: Task) => {
		if (displayedPerson) {
			socket.emit('makeTaskExchange', {
				taskId: task._id,
				soldierId: displayedPerson._id,
			});
		}
		handleClose();
	};

	socket.on('getTaskNotification', (tasks: DecodedTask[]) => {
		const decodedTasks = tasks.map(
			(task) => ({ ...task, date: parseISO(task.date) } as Task)
		);
		setTasks(
			decodedTasks.filter(
				(task: Task) => task.soldierId !== displayedPerson?._id
			)
		);
	});

	return (
		<div>
			<IconButton color="inherit" onClick={handleClickOpen}>
				<Badge badgeContent={tasks.length} color="secondary">
					<NotificationsIcon />
				</Badge>
			</IconButton>

			<Dialog
				scroll="paper"
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					{tasks.map((task) => {
						return (
							<ExchangeCard
								key={task._id}
								task={task}
								handleExchange={handleExchange}
							/>
						);
					})}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ExchangeCenter;
