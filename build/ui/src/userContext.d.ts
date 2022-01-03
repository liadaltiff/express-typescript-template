/// <reference types="react" />
import User from './components/UserInterface';
export declare type UserContextType = {
    user: User | null;
    setUser: (User: User) => void;
};
declare const userContext: import("react").Context<UserContextType>;
export default userContext;
//# sourceMappingURL=userContext.d.ts.map