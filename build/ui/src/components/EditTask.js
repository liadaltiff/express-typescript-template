"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const taskDialog_1 = __importDefault(require("./taskDialog"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
dotenv_1.default.config();
const EditTask = ({ tasks, setTasks, selectedTask, setSelectedTask, }) => {
    const [open, setOpen] = react_1.useState(false);
    const [editedTask, setEditedTask] = react_1.useState(Object.assign({}, selectedTask));
    const editTask = () => {
        axios_1.default.put(`/api/tasks/task/${selectedTask._id}`, {
            task: editedTask,
        })
            .then((res) => {
            setOpen(false);
            return res;
        })
            .then((res) => {
            if (res.status === 200) {
                sweetalert2_1.default.fire('מעולה!', 'תורנות נערכה!', 'success');
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
            sweetalert2_1.default.fire('אופס!', 'משהו השתבש. נסה שוב מאוחר יותר!', 'error');
        });
    };
    return (<>
			<core_1.Button variant="contained" color="primary" aria-label="Add" onClick={() => setOpen(true)}>
				<icons_1.Edit />
				ערוך
			</core_1.Button>
			<taskDialog_1.default setTask={setEditedTask} task={editedTask} sendFuncProp={editTask} open={open} setOpen={setOpen}/>
		</>);
};
exports.default = EditTask;
//# sourceMappingURL=EditTask.js.map