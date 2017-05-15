"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const auth_router_1 = require("./routers/auth-router");
const user_router_1 = require("./routers/user-router");
const item_router_1 = require("./routers/item-router");
const container_router_1 = require("./routers/container-router");
// creates and configures an ExpressJS web server.
class App {
    // run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // configure Express middleware.
    middleware() {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        mongoose.connect("mongodb://localhost/mydb");
    }
    // configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we"ve got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get("/", (req, res, next) => {
            res.json({
                message: "Hello World!"
            });
        });
        this.express.use("/", router);
        this.express.use("/api/v1/auth", auth_router_1.default);
        this.express.use("/api/v1/users", user_router_1.default);
        this.express.use("/api/v1/items", item_router_1.default);
        this.express.use("/api/v1/containers", container_router_1.default);
    }
}
exports.default = new App().express;
