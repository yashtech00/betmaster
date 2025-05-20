"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    image: {
        type: String,
    },
    yesPool: {
        type: Number,
        default: 0
    },
    noPool: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'resolved'],
        default: 'open'
    },
    result: {
        type: String,
        enum: ['yes', 'no', 'null'],
        default: null
    }
}, { timestamps: true });
const EventModel = mongoose_1.default.model("Event", EventSchema);
exports.default = EventModel;
