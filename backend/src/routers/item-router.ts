import {Router, Request, Response, NextFunction} from "express";

import {Item, IItemModel} from "../models/item";
import { BaseRouter } from "./base-router";

export class ItemRouter extends BaseRouter {
  public create(req: Request, res: Response, next: NextFunction) {
    const newItem: any = new Item(req.body);
    newItem.save((err)=> {
        if (err) {
            res.json({info: "error during Item create", error: err});
        }
        res.json({info: "Item saved successfully", data: newItem});
    });
  }

  public getAll(req: Request, res: Response, next: NextFunction): void {
    Item.find((err, Items) => {
        if (err) {
            res.json({info: "error during find Items", error: err});
        }
        res.json({info: "Items found successfully", data: Items});
    });
  }

  public get(req: Request, res: Response, next: NextFunction): void {
    Item.findById(req.params.id).populate('container').exec(function(err: any, Item: IItemModel): void {
        if (err) {
            res.json({info: "error during find Item", error: err});
        }
        if (Item) {
            res.json({info: "Item found successfully", data: Item});
        } else {
            res.json({info: "Item not found with id:"+ req.params.id});
        }
    });
  }

  protected init(): void {
    this.router.get("/", this.requireAuth, this.getAll);
    this.router.post("/", this.requireAuth, this.create);
    this.router.get("/:id", this.requireAuth, this.get);
  }

}

const itemRoutes: ItemRouter = new ItemRouter();

export default itemRoutes.router;
