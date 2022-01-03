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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const Autocomplete_1 = __importDefault(require("@material-ui/lab/Autocomplete"));
const CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
const dotenv_1 = __importDefault(require("dotenv"));
const styles_1 = require("@material-ui/core/styles");
const userContext_1 = __importDefault(require("../userContext"));
const DisplayedPersonContext_1 = __importDefault(require("../DisplayedPersonContext"));
dotenv_1.default.config();
const useStyles = styles_1.makeStyles((theme) => ({
    autocomplete: {
        backgroundColor: '#fff',
        margin: '1em 1em 1em 1em',
    },
}));
const UsersBox = () => {
    const classes = useStyles();
    const { user } = react_1.useContext(userContext_1.default);
    const { displayedPerson, setDisplayedPerson } = react_1.useContext(DisplayedPersonContext_1.default);
    const [open, setOpen] = react_1.useState(false);
    const [options, setOptions] = react_1.useState([]);
    const loading = open && options.length === 0;
    react_1.useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            axios_1.default.get(`/api/users`)
                .then((res) => res.data.users)
                .then((users) => {
                if (active) {
                    setOptions(users);
                }
            });
        }))();
        return () => {
            active = false;
        };
    }, [loading]);
    react_1.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    const optionLabel = (option) => {
        return (option._id +
            ' - ' +
            option.name +
            ((user === null || user === void 0 ? void 0 : user._id) === option._id ? ' (מחובר)' : ''));
    };
    return (<div className={classes.autocomplete}>
			<Autocomplete_1.default style={{ width: 300 }} open={open} onOpen={() => {
        setOpen(true);
    }} onClose={() => {
        setOpen(false);
    }} getOptionSelected={(option, value) => option.name === value.name} onChange={(_, value) => value && setDisplayedPerson(value)} value={displayedPerson} getOptionLabel={optionLabel} options={options} loading={loading} renderInput={(params) => (<TextField_1.default {...params} label="בחר חייל" variant="outlined" InputProps={Object.assign(Object.assign({}, params.InputProps), { endAdornment: (<>
									{loading ? (<CircularProgress_1.default color="inherit" size={20}/>) : null}
									{params.InputProps.endAdornment}
								</>) })}/>)}/>
		</div>);
};
exports.default = UsersBox;
//# sourceMappingURL=UsersBox.js.map