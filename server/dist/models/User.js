"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    positions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Position",
        },
    ],
    orders: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    transactions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ],
    trades: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Trade",
        },
    ],
}, { timestamps: true });
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
