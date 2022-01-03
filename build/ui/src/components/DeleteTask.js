"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const axios_1 = __importDefault(require("axios"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const DeleteTask = ({ deleteTaskFromArray, selectedTask, }) => {
    const handleDeleteTask = () => {
        if (selectedTask) {
            sweetalert2_1.default.fire({
                title: 'האם אתה בטוח שאתה רוצה למחוק את התורנות?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `מחק`,
                cancelButtonText: 'בטל',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios_1.default.delete(`/api/tasks/task/${selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask._id}`)
                        .then((res) => {
                        if (res.status === 200) {
                            deleteTaskFromArray(selectedTask);
                            sweetalert2_1.default.fire('מעולה!', 'תורנות נמחקה בהצלחה', 'success');
                        }
                    })
                        .then(() => (selectedTask = undefined))
                        .catch((error) => {
                        sweetalert2_1.default.fire('אופס!', 'קרתה שגיאה. נסה שנית מאוחר יותר', 'error');
                    });
                }
            });
        }
    };
    return (<core_1.Button variant="contained" color="secondary" onClick={handleDeleteTask} startIcon={<icons_1.Delete />}>
			מחק
		</core_1.Button>);
};
exports.default = DeleteTask;
//# sourceMappingURL=DeleteTask.js.map