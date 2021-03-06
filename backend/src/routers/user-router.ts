import {Router, Request, Response, NextFunction} from "express";

import {User, IUserModel} from "../models/user";
import { BaseRouter } from "./base-router";

export class UserRouter extends BaseRouter {
  public create(req: Request, res: Response, next: NextFunction) {
    const newUser: any = new User(req.body);
    newUser.save((err)=> {
        if (err) {
            res.json({info: "error during User create", error: err});
        }
        res.json({info: "User saved successfully", data: newUser});
    });
  }

  public getAll(req: Request, res: Response, next: NextFunction): void {
    User.find((err, Users) => {
        if (err) {
            res.json({info: "error during find Users", error: err});
        }
        res.json({info: "Users found successfully", data: Users});
    });
  }

  public get(req: Request, res: Response, next: NextFunction): void {
    User.findById(req.params.id, function(err: any, User: IUserModel): void {
        if (err) {
            res.json({info: "error during find User", error: err});
        }
        if (User) {
            res.json({info: "User found successfully", data: User});
        } else {
            res.json({info: "User not found with id:"+ req.params.id});
        }
    });
  }

  init(): void {
    this.router.get("/", this.requireAuth, this.getAll);
    this.router.post("/", this.requireAuth, this.create);
    this.router.get("/:id", this.requireAuth, this.get);
  }

}

const userRoutes: UserRouter = new UserRouter();

export default userRoutes.router;
