const passport: any = require("passport");
import {User, IUserModel} from "../models/user";
import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
const LocalStrategy: any = require("passport-local");

const localOptions: any = { usernameField: "email" };

const localLogin: any = new LocalStrategy(localOptions, function(email: string, password: string, done: any): any {
  User.findOne({email: email}, function(err: any, user: IUserModel): void {
    if(err) { return done(err); }
    if(!user) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

    user.comparePassword(password, function(err: any, isMatch: boolean): any {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

      return done(null, user);
    });
  });
});

const jwtOptions: any = {
  // telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // telling Passport where to find the secret
  secretOrKey: "røv"
};

const jwtLogin: JwtStrategy = new JwtStrategy(jwtOptions, function(payload: any, done: any): void {
  User.findById(payload._id, function(err: any, user: IUserModel): void {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
