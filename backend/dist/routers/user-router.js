"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const base_router_1 = require("./base-router");
class UserRouter extends base_router_1.BaseRouter {
    create(req, res, next) {
        const newUser = new user_1.User(req.body);
        newUser.save((err) => {
            if (err) {
                res.json({ info: "error during User create", error: err });
            }
            res.json({ info: "User saved successfully", data: newUser });
        });
    }
    getAll(req, res, next) {
        user_1.User.find((err, Users) => {
            if (err) {
                res.json({ info: "error during find Users", error: err });
            }
            res.json({ info: "Users found successfully", data: Users });
        });
    }
    get(req, res, next) {
        user_1.User.findById(req.params.id, function (err, User) {
            if (err) {
                res.json({ info: "error during find User", error: err });
            }
            if (User) {
                res.json({ info: "User found successfully", data: User });
            }
            else {
                res.json({ info: "User not found with id:" + req.params.id });
            }
        });
    }
    init() {
        this.router.get("/", this.requireAuth, this.getAll);
        this.router.post("/", this.requireAuth, this.create);
        this.router.get("/:id", this.requireAuth, this.get);
    }
}
exports.UserRouter = UserRouter;
const userRoutes = new UserRouter();
exports.default = userRoutes.router;
