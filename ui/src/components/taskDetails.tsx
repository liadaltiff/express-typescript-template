import React from 'react';
import Task from './TaskInteface';
import dotenv from 'dotenv';
dotenv.config();

interface TaskDetailsProps {
	selectedTask: Task | undefined;
}
const TaskDetails: React.FC<TaskDetailsProps> = ({ selectedTask }) => {
	return (
		<>
			{selectedTask && (
				<div>
					<h1>{selectedTask.name}</h1>
					<h2>{selectedTask.date.toLocaleDateString('fr-fr')}</h2>
					<h2>שעת התחלה: {selectedTask.startingHour}</h2>
					<h2>שעת סיום: {selectedTask.endingHour}</h2>
				</div>
			)}
		</>
	);
};

export default TaskDetails;
