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
const axios_1 = __importDefault(require("axios"));
const core_1 = require("@material-ui/core");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const dotenv_1 = __importDefault(require("dotenv"));
const socketContext_1 = __importDefault(require("../socketContext"));
dotenv_1.default.config();
const AskExchange = ({ selectedTask, setSelectedTask, tasks, setTasks, }) => {
    const [task, setTask] = react_1.useState(Object.assign({}, selectedTask));
    const { socket } = react_1.useContext(socketContext_1.default);
    const handleExchangeRequest = () => {
        sweetalert2_1.default.fire({
            title: 'האם אתה בטוח?',
            showCancelButton: true,
            confirmButtonText: `שלח`,
            cancelButtonText: 'בטל',
            icon: 'question',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios_1.default.put(`/api/tasks/askForExchange/${task._id}`)
                    .then((res) => {
                    if (res.status === 200) {
                        sweetalert2_1.default.fire('בקשה נשלחה בהצלחה!', '', 'success');
                        socket.emit('taskNotification', {});
                    }
                })
                    .then(() => {
                    const updatedTask = Object.assign(Object.assign({}, task), { askedForExchange: true });
                    setSelectedTask(updatedTask);
                    setTasks([
                        ...tasks.filter(({ _id }) => _id !== updatedTask._id),
                        updatedTask,
                    ]);
                });
            }
        });
    };
    return (<>
			<core_1.Button variant="contained" color="primary" onClick={handleExchangeRequest} disabled={task.askedForExchange}>
				בקש החלפה
			</core_1.Button>
		</>);
};
exports.default = AskExchange;
//# sourceMappingURL=AskExchange.js.map