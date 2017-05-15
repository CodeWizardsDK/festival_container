import {Router, Request, Response, NextFunction} from "express";

import {Container, IContainerModel} from "../models/container";
import { BaseRouter } from "./base-router";

export class ContainerRouter extends BaseRouter {
  public create(req: Request, res: Response, next: NextFunction) {
    const newContainer: any = new Container(req.body);
    newContainer.save((err)=> {
        if (err) {
            res.json({info: "error during Container create", error: err});
        }
        res.json({info: "Container saved successfully", data: newContainer});
    });
  }

  public getAll(req: Request, res: Response, next: NextFunction): void {
    Container.find((err, Containers) => {
        if (err) {
            res.json({info: "error during find Containers", error: err});
        }
        res.json({info: "Containers found successfully", data: Containers});
    });
  }

  public get(req: Request, res: Response, next: NextFunction): void {
    Container.findById(req.params.id, function(err: any, Container: IContainerModel): void {
        if (err) {
            res.json({info: "error during find Container", error: err});
        }
        if (Container) {
            res.json({info: "Container found successfully", data: Container});
        } else {
            res.json({info: "Container not found with id:"+ req.params.id});
        }
    });
  }
  public update(req: Request, res: Response, next: NextFunction): void {
    Container.findOneAndUpdate({_id: req.params.id}, req.body, function(err: any, Container: IContainerModel): void {
        if (err) {
            res.json({info: "error during find Container", error: err});
        }
        if (Container) {
            res.json({info: "Container updated successfully", data: Container});
        } else {
            res.json({info: "Container not found with id:"+ req.params.id});
        }
    });
  }

  protected init(): void {
    this.router.get("/", this.requireAuth, this.getAll);
    this.router.post("/", this.requireAuth, this.create);
    this.router.get("/:id", this.requireAuth, this.get);
    this.router.put("/:id", this.requireAuth, this.update);
  }

}

const containerRoutes: ContainerRouter = new ContainerRouter();

export default containerRoutes.router;
