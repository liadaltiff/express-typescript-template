/// <reference types="react" />
import User from './components/UserInterface';
export declare type DisplayedPersonType = {
    displayedPerson: User | null;
    setDisplayedPerson: (displayedPerson: User) => void;
};
declare const displayedPresonContext: import("react").Context<DisplayedPersonType>;
export default displayedPresonContext;
//# sourceMappingURL=DisplayedPersonContext.d.ts.map