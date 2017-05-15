import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

interface IContainer {
    name: string;
}

export interface IContainerModel extends IContainer, mongoose.Document {}
const containerSchema: mongoose.Schema = new mongoose.Schema({
    name: {type: String, required: true},
});

export const Container: mongoose.Model<IContainerModel> = mongoose.model<IContainerModel>("Container", containerSchema);
