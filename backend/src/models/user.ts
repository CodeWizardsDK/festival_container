import * as mongoose from "mongoose";

interface IUser {
    first_name: string;
    last_name: string;
    email: string;
}

interface IUserModel extends IUser, mongoose.Document {}
const userSchema: mongoose.Schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
});

const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>("User", userSchema);

export = User;
