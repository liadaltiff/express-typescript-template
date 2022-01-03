"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TaskDetails = ({ selectedTask }) => {
    return (<>
			{selectedTask && (<div>
					<h1>{selectedTask.name}</h1>
					<h2>{selectedTask.date.toLocaleDateString('fr-fr')}</h2>
					<h2>שעת התחלה: {selectedTask.startingHour}</h2>
					<h2>שעת סיום: {selectedTask.endingHour}</h2>
				</div>)}
		</>);
};
exports.default = TaskDetails;
//# sourceMappingURL=taskDetails.js.map