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
const styles_1 = require("@material-ui/core/styles");
const AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
const Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
const IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const Menu_1 = __importDefault(require("@material-ui/core/Menu"));
const AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
const MoreVert_1 = __importDefault(require("@material-ui/icons/MoreVert"));
const ExchangeCenter_1 = __importDefault(require("./ExchangeCenter"));
const userContext_1 = __importDefault(require("../userContext"));
const UsersBox_1 = __importDefault(require("./UsersBox"));
const Roles_1 = __importDefault(require("./Roles"));
const useStyles = styles_1.makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));
const NavBar = () => {
    const { user } = react_1.useContext(userContext_1.default);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = react_1.default.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = react_1.default.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const logOut = () => {
        handleMenuClose();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.reload(false);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (<Menu_1.default anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMenuOpen} onClose={handleMenuClose}>
            <MenuItem_1.default onClick={logOut}>התנתק</MenuItem_1.default>
        </Menu_1.default>);
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (<Menu_1.default anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
            <MenuItem_1.default>
                <ExchangeCenter_1.default />
                <p>אזור החלפות</p>
            </MenuItem_1.default>
            <MenuItem_1.default onClick={handleProfileMenuOpen}>
                <IconButton_1.default aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
                    <AccountCircle_1.default />
                </IconButton_1.default>
                <p>פרופיל</p>
            </MenuItem_1.default>
        </Menu_1.default>);
    return (<div className={classes.grow}>
            <AppBar_1.default position="static">
                <Toolbar_1.default>
                    <Typography_1.default className={classes.title} variant="h6" noWrap>
                        שיבוצית
                    </Typography_1.default>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        {(user === null || user === void 0 ? void 0 : user.role) === Roles_1.default.Admin && <UsersBox_1.default />}
                        <ExchangeCenter_1.default />
                        <IconButton_1.default edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                            <AccountCircle_1.default />
                        </IconButton_1.default>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton_1.default aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                            <MoreVert_1.default />
                        </IconButton_1.default>
                    </div>
                </Toolbar_1.default>
            </AppBar_1.default>
            {renderMobileMenu}
            {renderMenu}
        </div>);
};
exports.default = NavBar;
//# sourceMappingURL=NavBar.js.map