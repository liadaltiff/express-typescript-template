import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import SocketContext from '../socketContext';

const SocketTest: React.FC = () => {
	const { socket } = useContext(SocketContext);
	const handleButtonClick = () => {
		socket.emit('taskNotification', {});
	};

	return (
		<div>
			<Button variant="contained" onClick={handleButtonClick}>
				בדיקה
			</Button>
		</div>
	);
};
export default SocketTest;
