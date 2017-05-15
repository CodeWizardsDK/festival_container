import {Router, Request, Response, NextFunction} from "express";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import {User, IUserModel} from "../models/user";
import { BaseRouter } from "./base-router";

function generateToken(user: IUserModel): string {
  return jwt.sign(user, "røv", {
    expiresIn: 10080 // in seconds
  });
}

function setUserInfo(user: IUserModel): any {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };
}

export class AuthRouter extends BaseRouter {
  public login(req: Request, res: Response, next: NextFunction) {
    User.findOne({email: req.body.email}, (err, user: IUserModel) => {
      if (err) {throw err;}
      if (!user) {
        res.json({ success: false, message: "Authentication failed"});
      } else if (user) {
        user.comparePassword(req.body.password, (err: any, isMatch: boolean): any => {
          if (err) {throw err;}
          if (isMatch) {
            let userInfo: any = setUserInfo(user);

            res.status(200).json({
              token: "JWT " + generateToken(userInfo),
              user: userInfo
            });
          } else {
            res.json({ success: false, message: "Authentication failed"});
          }

        });
      }
    });
  }

  init(): void {
    this.router.post("/", this.requireLogin, this.login);
  }

}

const authRoutes: AuthRouter = new AuthRouter();

export default authRoutes.router;
