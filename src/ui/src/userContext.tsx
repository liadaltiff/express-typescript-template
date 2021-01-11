import { createContext } from 'react';
import User from './components/UserInterface';
export type UserContextType = {
    user: User | null;
    setUser: (User: User) => void;
};

const UserContextDefaultValue: UserContextType = {
    user: null,
    setUser(user) {
        this.user = user;
    },
};

const userContext = createContext<UserContextType>(UserContextDefaultValue);

export default userContext;
