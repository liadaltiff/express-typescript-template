import React from 'react';
import { Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Task from './TaskInteface';

interface DeleteTaskProps {
	deleteTaskFromArray: (taskToDelete: Task | undefined) => void;
	selectedTask: Task | undefined;
}
const DeleteTask: React.FC<DeleteTaskProps> = ({
	deleteTaskFromArray,
	selectedTask,
}) => {
	const handleDeleteTask = () => {
		if (selectedTask) {
			Swal.fire({
				title: 'האם אתה בטוח שאתה רוצה למחוק את התורנות?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: `מחק`,
				cancelButtonText: 'בטל',
			}).then((result) => {
				if (result.isConfirmed) {
					Axios.delete(`/api/tasks/task/${selectedTask?._id}`)
						.then((res) => {
							if (res.status === 200) {
								deleteTaskFromArray(selectedTask);
								Swal.fire(
									'מעולה!',
									'תורנות נמחקה בהצלחה',
									'success'
								);
							}
						})
						.then(() => (selectedTask = undefined))
						.catch((error) => {
							Swal.fire(
								'אופס!',
								'קרתה שגיאה. נסה שנית מאוחר יותר',
								'error'
							);
						});
				}
			});
		}
	};

	return (
		<Button
			variant="contained"
			color="secondary"
			onClick={handleDeleteTask}
			startIcon={<Delete />}
		>
			מחק
		</Button>
	);
};

export default DeleteTask;
