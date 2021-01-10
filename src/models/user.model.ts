import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
    _id: String;
    name: String;
    email: String;
    password: String;
    phoneNumber: String;
    role: Number;
}

const user: Schema = new Schema(
    {
        _id: String,
        name: String,
        email: String,
        password: String,
        phoneNumber: String,
        role: Number,
    },
    { versionKey: false }
);

export default model<IUser>('User', user);
