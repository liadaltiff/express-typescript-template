"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const UserContextDefaultValue = {
    user: null,
    setUser(user) {
        this.user = user;
    },
};
const userContext = react_1.createContext(UserContextDefaultValue);
exports.default = userContext;
//# sourceMappingURL=userContext.js.map