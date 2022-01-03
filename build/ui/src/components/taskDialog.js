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
const date_fns_1 = __importDefault(require("@date-io/date-fns"));
const core_1 = require("@material-ui/core");
const pickers_1 = require("@material-ui/pickers");
const useStyles = core_1.makeStyles((theme) => ({
    taskDialogFormContainer: {
        display: 'flex',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
}));
const TaskDialog = ({ open, setOpen, sendFuncProp, task, setTask, }) => {
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
    };
    const handleSendClick = () => {
        handleClose();
        sendFuncProp();
    };
    const timeToDate = (time) => {
        if (time) {
            let timeDecoded = time.split(':').map((e) => +e);
            return new Date(Date.prototype.setHours.apply(new Date(), [
                timeDecoded[0],
                timeDecoded[1],
            ]));
        }
        else {
            return null;
        }
    };
    const [startingHour, setStartingHour] = react_1.useState(timeToDate(task.startingHour));
    const [endingHour, setEndingHour] = react_1.useState(timeToDate(task.endingHour));
    return (<>
            {task && (<core_1.Dialog open={open} onClose={handleClose}>
                    <core_1.DialogContent>
                        <form className={classes.taskDialogFormContainer}>
                            <core_1.TextField id="standard-basic" label="שם תורנות" value={task.name} onChange={(e) => setTask(Object.assign(Object.assign({}, task), { name: e.target.value }))} error={!task.name}/>
                            <pickers_1.MuiPickersUtilsProvider utils={date_fns_1.default}>
                                <pickers_1.KeyboardDatePicker dir="ltr" margin="normal" id="date-picker-dialog" label="תאריך תורנות" format="dd/MM/yyyy" value={task.date} onChange={(e) => {
        e && setTask(Object.assign(Object.assign({}, task), { date: e }));
    }} KeyboardButtonProps={{
        'aria-label': 'change date',
    }} disablePast={true} error={!task.date}/>
                                <pickers_1.KeyboardTimePicker dir="ltr" margin="normal" id="time-picker" label="בחר שעת התחלה" value={startingHour} onChange={(e) => {
        if (e) {
            setStartingHour(e);
            setTask(Object.assign(Object.assign({}, task), { startingHour: e
                    .toLocaleTimeString('it-IT')
                    .slice(0, -3) }));
        }
    }} KeyboardButtonProps={{
        'aria-label': 'change time',
    }} error={!startingHour}/>
                                <pickers_1.KeyboardTimePicker dir="ltr" margin="normal" id="time-picker" label="בחר שעת סיום" value={endingHour} onChange={(e) => {
        if (e) {
            setEndingHour(e);
            setTask(Object.assign(Object.assign({}, task), { endingHour: e
                    .toLocaleTimeString('it-IT')
                    .slice(0, -3) }));
        }
    }} KeyboardButtonProps={{
        'aria-label': 'change time',
    }} error={!endingHour}/>
                            </pickers_1.MuiPickersUtilsProvider>
                        </form>
                    </core_1.DialogContent>
                    <core_1.DialogActions>
                        <core_1.Button color="primary" onClick={handleSendClick} disabled={!task.name ||
        !task.date ||
        !task.startingHour ||
        !task.endingHour}>
                            שלח
                        </core_1.Button>
                    </core_1.DialogActions>
                </core_1.Dialog>)}
        </>);
};
exports.default = TaskDialog;
//# sourceMappingURL=taskDialog.js.map