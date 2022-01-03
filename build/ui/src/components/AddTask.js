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
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const core_1 = require("@material-ui/core");
const axios_1 = __importDefault(require("axios"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const DisplayedPersonContext_1 = __importDefault(require("../DisplayedPersonContext"));
const dotenv_1 = __importDefault(require("dotenv"));
const date_fns_1 = require("date-fns");
const taskDialog_1 = __importDefault(require("./taskDialog"));
dotenv_1.default.config();
const AddTask = ({ tasks, setTasks, selectedDate, setSelectedDate, }) => {
    const { displayedPerson } = react_1.useContext(DisplayedPersonContext_1.default);
    const newTaskDefault = {
        name: '',
        date: selectedDate,
        startingHour: '',
        endingHour: '',
        soldierId: displayedPerson ? displayedPerson === null || displayedPerson === void 0 ? void 0 : displayedPerson._id : '',
    };
    const [open, setOpen] = react_1.useState(false);
    const [newTask, setNewTask] = react_1.useState(newTaskDefault);
    const addTask = () => {
        axios_1.default.post(`/api/tasks`, {
            task: newTask,
        })
            .then((res) => {
            if (res.status === 200) {
                sweetalert2_1.default.fire('מעולה!', 'תורנות נוספה בהצלחה!', 'success');
            }
            else if (res.status === 400) {
                sweetalert2_1.default.fire('אופס!', 'תאריך לא פנוי!', 'error');
            }
            return res.data.savedTask;
        })
            .then((savedTask) => {
            savedTask.date = date_fns_1.parseISO(savedTask.date);
            setTasks([...tasks, savedTask]);
            setSelectedDate(savedTask.date);
        })
            .catch((error) => {
            sweetalert2_1.default.fire('אופס!', 'משהו השתבש. נסה שוב מאוחר יותר!', 'error');
        });
    };
    return (<>
			<core_1.Button variant="contained" color="primary" aria-label="Add" onClick={() => setOpen(true)}>
				<Add_1.default />
				הוסף תורנות
			</core_1.Button>
			<taskDialog_1.default setTask={setNewTask} task={newTask} sendFuncProp={addTask} open={open} setOpen={setOpen}/>
		</>);
};
exports.default = AddTask;
//# sourceMappingURL=AddTask.js.map