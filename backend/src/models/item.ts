import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

interface IItem {
    name: string;
    tagId: string;
    itemNo: number;
    container: String;
}

export interface IItemModel extends IItem, mongoose.Document {}
const itemSchema: mongoose.Schema = new mongoose.Schema({
    name: {type: String, required: true},
    tagId: String,
    itemNo: {type: Number, required: true},
    container: {type: String, ref: "Container"},
});

export const Item: mongoose.Model<IItemModel> = mongoose.model<IItemModel>("Item", itemSchema);
