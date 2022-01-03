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
const NavBar_1 = __importDefault(require("./components/NavBar"));
const SignIn_1 = __importDefault(require("./components/Auth/SignIn"));
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const userContext_1 = __importDefault(require("./userContext"));
const DisplayedPersonContext_1 = __importDefault(require("./DisplayedPersonContext"));
const socketContext_1 = __importDefault(require("./socketContext"));
const dotenv_1 = __importDefault(require("dotenv"));
const DisplayedInfo_1 = __importDefault(require("./components/DisplayedInfo"));
const styles_1 = require("@material-ui/core/styles");
const core_1 = require("@material-ui/core");
const socket_io_client_1 = require("socket.io-client");
dotenv_1.default.config();
const theme = styles_1.createMuiTheme({
    direction: 'rtl',
});
const useStyles = core_1.makeStyles((theme) => ({
    appContainer: {
        display: 'flex',
        alignItems: 'baseline',
    },
}));
// const newSocket = io(`http://${process.env.REACT_APP_HOST}`, {
// 	transports: ['websocket'],
// 	upgrade: false,
// });
const newSocket = socket_io_client_1.io(``, {
    transports: ['websocket'],
    upgrade: false,
});
const App = () => {
    // const classes = useStyles();
    const [socket, setSocket] = react_1.useState(newSocket);
    const [token, setToken] = react_1.useState('');
    const [user, setUser] = react_1.useState(null);
    const [displayedPerson, setDisplayedPerson] = react_1.useState(null);
    react_1.useEffect(() => {
        const currentToken = sessionStorage.getItem('token');
        const currentUser = sessionStorage.getItem('user');
        if (currentToken != null && currentUser != null) {
            setToken(currentToken);
            setUser(JSON.parse(currentUser));
            setDisplayedPerson(JSON.parse(currentUser));
        }
        else {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            setToken('');
            setUser(null);
            setDisplayedPerson(null);
        }
    }, []);
    if (!token) {
        return (<styles_1.ThemeProvider theme={theme}>
				<div dir="rtl">
					<SignIn_1.default setToken={setToken} setUser={setUser} setDisplayedPerson={setDisplayedPerson}></SignIn_1.default>
				</div>
			</styles_1.ThemeProvider>);
    }
    return (<styles_1.ThemeProvider theme={theme}>
			<div className="App">
				<userContext_1.default.Provider value={{ user, setUser }}>
					<DisplayedPersonContext_1.default.Provider value={{ displayedPerson, setDisplayedPerson }}>
						<socketContext_1.default.Provider value={{ socket, setSocket }}>
							<react_router_dom_1.BrowserRouter>
								<react_router_dom_1.Switch>
									<react_router_dom_1.Route path="/">
										<NavBar_1.default></NavBar_1.default>
										<DisplayedInfo_1.default />
									</react_router_dom_1.Route>
								</react_router_dom_1.Switch>
							</react_router_dom_1.BrowserRouter>
						</socketContext_1.default.Provider>
					</DisplayedPersonContext_1.default.Provider>
				</userContext_1.default.Provider>
				
			</div>
		</styles_1.ThemeProvider>);
};
exports.default = App;
//# sourceMappingURL=App.js.map