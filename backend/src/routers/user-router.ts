import {Router, Request, Response, NextFunction} from "express";

import {User, IUserModel} from "../models/user";

export class UserRouter {
  router: Router;

  /**
   * Initialize the UserRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Useres.
   */
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

  /**
   * Take each handler, and attach to one of the Express.Router"s
   * endpoints.
   */
  init(): void {
    this.router.get("/", this.getAll);
    this.router.post("/", this.create);
    this.router.get("/:id", this.get);
  }

}

// create the UserRouter, and export its configured Express.Router
const userRoutes: UserRouter = new UserRouter();
userRoutes.init();

export default userRoutes.router;
