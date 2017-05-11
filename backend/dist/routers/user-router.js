"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User = require("../models/user");
class UserRouter {
    /**
     * Initialize the UserRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Useres.
     */
    create(req, res, next) {
        const newUser = new User(req.body);
        newUser.save((err) => {
            if (err) {
                res.json({ info: "error during User create", error: err });
            }
            res.json({ info: "User saved successfully", data: newUser });
        });
    }
    getAll(req, res, next) {
        User.find((err, Users) => {
            if (err) {
                res.json({ info: "error during find Users", error: err });
            }
            res.json({ info: "Users found successfully", data: Users });
        });
    }
    get(req, res, next) {
        User.findById(req.params.id, function (err, User) {
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
    /**
     * Take each handler, and attach to one of the Express.Router"s
     * endpoints.
     */
    init() {
        this.router.get("/", this.getAll);
        this.router.post("/", this.create);
        this.router.get("/:id", this.get);
    }
}
exports.UserRouter = UserRouter;
// create the UserRouter, and export its configured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();
exports.default = userRoutes.router;
