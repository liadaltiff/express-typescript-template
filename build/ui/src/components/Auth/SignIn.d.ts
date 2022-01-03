import React from 'react';
import User from '../UserInterface';
interface SignInProps {
    setToken: (token: String) => void;
    setUser: (user: User) => void;
    setDisplayedPerson: (user: User) => void;
}
declare const SignIn: React.FC<SignInProps>;
export default SignIn;
//# sourceMappingURL=SignIn.d.ts.map