"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => {
    const mongoUrl = process.env.MONGO_URL;
    console.log(mongoUrl);
    if (!mongoUrl) {
        throw new Error("MONGO_URL is not defined in the environment variables.");
    }
    try {
        mongoose_1.default.connect(mongoUrl)
            .then(() => {
            console.log("Connected to MongoDB successfully.");
        })
            .catch((e) => {
            console.error("Error connecting to MongoDB:", e);
            throw e;
        });
    }
    catch (e) {
        console.error("Error connecting to MongoDB:", e);
        throw e;
    }
};
exports.default = connectDB;
