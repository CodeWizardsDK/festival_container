import * as passport from "passport";
require("../config/passport");
import {Router, Request, Response, NextFunction} from "express";

export class BaseRouter {
  public requireAuth;
  public requireLogin;
  public router: Router;

  constructor() {
    this.requireAuth = passport.authenticate("jwt", { session: false });
    this.requireLogin = passport.authenticate("local", { session: false });
    this.router = Router();
    this.init();
  }

  /*
   * Override in implementation
   */
  protected init(): void {
    throw new Error("Not implementet")
  };
}
