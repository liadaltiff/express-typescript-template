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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const react_nice_dates_1 = require("react-nice-dates");
require("react-nice-dates/build/style.css");
const AppCalendar = ({ changeSelectedDate, selectedDate, tasks, }) => {
    const selectedDates = react_1.useMemo(() => tasks.map((task) => task.date), [
        tasks,
    ]);
    const modifiers = {
        taskDay: (date) => selectedDates.some((selectedDate) => date_fns_1.isSameDay(selectedDate, date)),
        disabled: (date) => date_fns_1.isBefore(date, new Date()) &&
            !date_fns_1.isSameDay(date, new Date()) &&
            !selectedDates.some((selectedDate) => date_fns_1.isSameDay(selectedDate, date)),
    };
    const modifiersClassNames = {
        taskDay: '-taskDay',
    };
    const handleDayClick = (date) => date && changeSelectedDate(date);
    return (<div>
            <react_nice_dates_1.DatePickerCalendar date={selectedDate} onDateChange={handleDayClick} locale={locale_1.he} modifiers={modifiers} modifiersClassNames={modifiersClassNames}/>
        </div>);
};
exports.default = AppCalendar;
//# sourceMappingURL=Calender.js.map