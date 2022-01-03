"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const displayedPresonContextDefaultValue = {
    displayedPerson: null,
    setDisplayedPerson(displayedPerson) {
        this.displayedPerson = displayedPerson;
    },
};
const displayedPresonContext = react_1.createContext(displayedPresonContextDefaultValue);
exports.default = displayedPresonContext;
//# sourceMappingURL=DisplayedPersonContext.js.map