"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const useStyles = core_1.makeStyles((theme) => core_1.createStyles({
    cardGrid: {
        display: 'flex',
        alignItems: 'center',
    },
}));
const ExchangeCard = ({ task, handleExchange, }) => {
    const classes = useStyles();
    return (<core_1.Card>
            <core_1.CardContent>
                <core_1.Grid container wrap="nowrap" spacing={2} className={classes.cardGrid}>
                    <core_1.Grid item>
                        <core_1.Typography>{task.name}</core_1.Typography>
                        <core_1.Typography>
                            {task.date.toLocaleDateString('fr-fr')}
                        </core_1.Typography>
                        <core_1.Typography>
                            {task.startingHour}-{task.endingHour}
                        </core_1.Typography>
                    </core_1.Grid>
                    <core_1.Grid item>
                        <core_1.Button variant="outlined" color="primary" onClick={() => {
        handleExchange(task);
    }}>
                            החלף
                        </core_1.Button>
                    </core_1.Grid>
                </core_1.Grid>
            </core_1.CardContent>
        </core_1.Card>);
};
exports.default = ExchangeCard;
//# sourceMappingURL=ExchangeCard.js.map