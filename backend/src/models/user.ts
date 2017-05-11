import * as mongoose from "mongoose";

interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string
}

interface IUserModel extends IUser, mongoose.Document {}
const userSchema: mongoose.Schema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true},
});

const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>("User", userSchema);

export = User;
