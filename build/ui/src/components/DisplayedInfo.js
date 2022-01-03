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
const Calender_1 = __importDefault(require("./Calender"));
const date_fns_1 = require("date-fns");
const axios_1 = __importDefault(require("axios"));
const taskDetails_1 = __importDefault(require("./taskDetails"));
const DisplayedPersonContext_1 = __importDefault(require("../DisplayedPersonContext"));
const userContext_1 = __importDefault(require("../userContext"));
const Roles_1 = __importDefault(require("./Roles"));
const AddTask_1 = __importDefault(require("./AddTask"));
const DeleteTask_1 = __importDefault(require("./DeleteTask"));
const EditTask_1 = __importDefault(require("./EditTask"));
const AskExchange_1 = __importDefault(require("./AskExchange"));
const socketContext_1 = __importDefault(require("../socketContext"));
const useStyles = core_1.makeStyles((theme) => ({
    displayedInfoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));
const DisplayedInfo = () => {
    const { socket } = react_1.useContext(socketContext_1.default);
    const classes = useStyles();
    const [selectedDate, changeSelectedDate] = react_1.useState(new Date());
    const [tasks, setTasks] = react_1.useState([]);
    const [selectedTask, setSelectedTask] = react_1.useState(undefined);
    const { displayedPerson } = react_1.useContext(DisplayedPersonContext_1.default);
    const { user } = react_1.useContext(userContext_1.default);
    const getTasks = () => {
        if (displayedPerson) {
            const { REACT_APP_HOST } = process.env;
            axios_1.default.get(`http://${REACT_APP_HOST}/api/tasks/soldiers/${displayedPerson._id}`)
                .then((res) => res.data.tasks)
                .then((tasks) => tasks.map((task) => (Object.assign(Object.assign({}, task), { date: date_fns_1.parseISO(task.date) }))))
                .then((tasks) => {
                setTasks(tasks);
            });
        }
    };
    socket.on('refreshTasks', () => {
        getTasks();
        console.log('refreshing tasks');
    });
    react_1.useEffect(() => {
        setSelectedTask(tasks.find((task) => selectedDate && date_fns_1.isSameDay(task.date, selectedDate)));
    }, [selectedDate]);
    react_1.useEffect(() => {
        getTasks();
        setSelectedTask(undefined);
        changeSelectedDate(new Date());
    }, [displayedPerson]);
    const deleteTaskFromArray = (taskToDelete) => {
        if (taskToDelete) {
            setTasks(tasks.filter((task) => task._id !== taskToDelete._id));
        }
        setSelectedTask(undefined);
    };
    const DetailsSection = () => {
        if (selectedTask) {
            return (<>
                    <taskDetails_1.default selectedTask={selectedTask}/>
                    <AskExchange_1.default selectedTask={selectedTask} setSelectedTask={setSelectedTask} tasks={tasks} setTasks={setTasks}/>
                    {(user === null || user === void 0 ? void 0 : user.role) === Roles_1.default.Admin && (<DeleteTask_1.default selectedTask={selectedTask} deleteTaskFromArray={deleteTaskFromArray}/>)}
                    {(user === null || user === void 0 ? void 0 : user.role) === Roles_1.default.Admin && (<EditTask_1.default selectedTask={selectedTask} setSelectedTask={setSelectedTask} tasks={tasks} setTasks={setTasks}/>)}
                </>);
        }
        else if ((user === null || user === void 0 ? void 0 : user.role) === Roles_1.default.Admin) {
            return (<AddTask_1.default tasks={tasks} setTasks={setTasks} selectedDate={selectedDate} setSelectedDate={changeSelectedDate}/>);
        }
        else {
            return null;
        }
    };
    return (<div>
            <core_1.Grid container spacing={0} className={classes.displayedInfoContainer}>
                <core_1.Grid item xs={8} style={{ maxWidth: 50 + '%' }}>
                    <div dir="rtl">
                        <Calender_1.default tasks={tasks} selectedDate={selectedDate} changeSelectedDate={changeSelectedDate}/>
                    </div>
                </core_1.Grid>
                <core_1.Grid item xs={4}>
                    <DetailsSection />
                </core_1.Grid>
            </core_1.Grid>
        </div>);
};
exports.default = DisplayedInfo;
//# sourceMappingURL=DisplayedInfo.js.map