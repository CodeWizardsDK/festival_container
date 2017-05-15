import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import AuthRouter from "./routers/auth-router";
import UserRouter from "./routers/user-router";
import ItemRouter from "./routers/item-router";
import ContainerRouter from "./routers/container-router";


// creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  // run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // configure Express middleware.
  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    mongoose.connect("mongodb://localhost/mydb");
  }

  // configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we"ve got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router: express.Router = express.Router();
    // placeholder route handler
    router.get("/", (req, res, next) => {
      res.json({
        message: "Hello World!"
      });
    });
    this.express.use("/", router);
    this.express.use("/api/v1/auth", AuthRouter);
    this.express.use("/api/v1/users", UserRouter);
    this.express.use("/api/v1/items", ItemRouter);
    this.express.use("/api/v1/containers", ContainerRouter);
  }

}

export default new App().express;
