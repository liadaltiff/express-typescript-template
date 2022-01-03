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
const Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const LockOutlined_1 = __importDefault(require("@material-ui/icons/LockOutlined"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const styles_1 = require("@material-ui/core/styles");
const Container_1 = __importDefault(require("@material-ui/core/Container"));
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const axios_1 = __importDefault(require("axios"));
const useStyles = styles_1.makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const SignIn = ({ setToken, setUser, setDisplayedPerson, }) => {
    const classes = useStyles();
    const [email, changeEmail] = react_1.useState('');
    const [password, changePassword] = react_1.useState('');
    const validateEmail = () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    const handleLogin = (event) => {
        event.preventDefault();
        axios_1.default.post(`/api/users/login`, {
            email: email,
            password: password,
        })
            .then((res) => res.data)
            .then(({ token, user }) => {
            setToken(token);
            setUser(user);
            setDisplayedPerson(user);
            sessionStorage.setItem('token', JSON.stringify(token));
            sessionStorage.setItem('user', JSON.stringify(user));
        })
            .catch((error) => sweetalert2_1.default.fire('אופס!', 'סיסמה שגויה!', 'error'));
    };
    return (<Container_1.default component="main" maxWidth="xs" dir="rtl">
			<CssBaseline_1.default />
			<div className={classes.paper}>
				<Avatar_1.default className={classes.avatar}>
					<LockOutlined_1.default />
				</Avatar_1.default>
				<Typography_1.default component="h1" variant="h5">
					כניסה
				</Typography_1.default>
				<form className={classes.form} onSubmit={handleLogin}>
					<TextField_1.default variant="outlined" margin="normal" required fullWidth id="email" label="אימייל" name="email" autoComplete="email" autoFocus onChange={(e) => changeEmail(e.target.value)} error={!validateEmail() && email !== ''}/>
					<TextField_1.default variant="outlined" margin="normal" required fullWidth name="password" label="סיסמה" type="password" id="password" autoComplete="current-password" onChange={(e) => changePassword(e.target.value)}/>
					<Button_1.default type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						התחבר
					</Button_1.default>
				</form>
			</div>
		</Container_1.default>);
};
exports.default = SignIn;
//# sourceMappingURL=SignIn.js.map