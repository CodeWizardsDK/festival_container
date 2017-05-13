import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface IUserModel extends IUser, mongoose.Document {
    comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;
}
const userSchema: mongoose.Schema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true},
});

userSchema.pre("save", function save(next) {
  const user: IUserModel = this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword: string, cb: (err: any, isMatch: any) => {}): void {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error , isMatch: boolean) => {
    cb(err, isMatch);
  });
};




export const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>("User", userSchema);
