import { createContext } from 'react';
import User from './components/UserInterface';

export type DisplayedPersonType = {
    displayedPerson: User | null;
    setDisplayedPerson: (displayedPerson: User) => void;
};

const displayedPresonContextDefaultValue: DisplayedPersonType = {
    displayedPerson: null,
    setDisplayedPerson(displayedPerson) {
        this.displayedPerson = displayedPerson;
    },
};

const displayedPresonContext = createContext<DisplayedPersonType>(
    displayedPresonContextDefaultValue
);

export default displayedPresonContext;
