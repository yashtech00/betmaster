"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TradeSchema = new Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    eventId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Event",
    },
    outcome: {
        type: String,
        enum: ['YES', 'NO'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, { timestamps: true });
const TradeModel = mongoose_1.default.model("Trade", TradeSchema);
exports.default = TradeModel;
