import * as passport from "passport";
require("../config/passport");

export class BaseRouter {
  public requireAuth;
  public requireLogin;

  constructor() {
    this.requireAuth = passport.authenticate("jwt", { session: false });
    this.requireLogin = passport.authenticate("local", { session: false });
  }
}
