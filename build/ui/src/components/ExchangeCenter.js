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
const Notifications_1 = __importDefault(require("@material-ui/icons/Notifications"));
const axios_1 = __importDefault(require("axios"));
const date_fns_1 = require("date-fns");
const DisplayedPersonContext_1 = __importDefault(require("../DisplayedPersonContext"));
const dotenv_1 = __importDefault(require("dotenv"));
const socketContext_1 = __importDefault(require("../socketContext"));
const ExchangeCard_1 = __importDefault(require("./ExchangeCard"));
dotenv_1.default.config();
const useStyles = core_1.makeStyles((theme) => ({
    card: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'space-between',
    },
}));
const ExchangeCenter = () => {
    const { socket } = react_1.useContext(socketContext_1.default);
    const classes = useStyles();
    const { displayedPerson } = react_1.useContext(DisplayedPersonContext_1.default);
    const [open, setOpen] = react_1.useState(false);
    const [tasks, setTasks] = react_1.useState([]);
    react_1.useEffect(() => {
        axios_1.default.get(`/api/tasks/avilableForExchange`)
            .then((res) => res.data.tasks)
            .then((tasks) => tasks.map((task) => (Object.assign(Object.assign({}, task), { date: date_fns_1.parseISO(task.date) }))))
            .then((tasks) => {
            if (displayedPerson)
                return tasks.filter((task) => task.soldierId !== (displayedPerson === null || displayedPerson === void 0 ? void 0 : displayedPerson._id));
            return tasks;
        })
            .then((tasks) => tasks.sort((a, b) => a.date.valueOf() - b.date.valueOf()))
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
    const handleExchange = (task) => {
        if (displayedPerson) {
            socket.emit('makeTaskExchange', {
                taskId: task._id,
                soldierId: displayedPerson._id,
            });
        }
        handleClose();
    };
    socket.on('getTaskNotification', (tasks) => {
        const decodedTasks = tasks.map((task) => (Object.assign(Object.assign({}, task), { date: date_fns_1.parseISO(task.date) })));
        setTasks(decodedTasks.filter((task) => task.soldierId !== (displayedPerson === null || displayedPerson === void 0 ? void 0 : displayedPerson._id)));
    });
    return (<div>
			<core_1.IconButton color="inherit" onClick={handleClickOpen}>
				<core_1.Badge badgeContent={tasks.length} color="secondary">
					<Notifications_1.default />
				</core_1.Badge>
			</core_1.IconButton>

			<core_1.Dialog scroll="paper" open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<core_1.DialogContent>
					{tasks.map((task) => {
        return (<ExchangeCard_1.default key={task._id} task={task} handleExchange={handleExchange}/>);
    })}
				</core_1.DialogContent>
			</core_1.Dialog>
		</div>);
};
exports.default = ExchangeCenter;
//# sourceMappingURL=ExchangeCenter.js.map