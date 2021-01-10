import { Document } from 'mongoose';
export interface IUser extends Document {
    _id: String;
    name: String;
    email: String;
    password: String;
    phoneNumber: String;
    role: Number;
}
declare const _default: import("mongoose").Model<IUser>;
export default _default;
//# sourceMappingURL=user.model.d.ts.map