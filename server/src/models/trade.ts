import mongoose from "mongoose";


const Schema = mongoose.Schema;

const TradeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        required:true
    },
    outcome: {
        type: String,
        enum: ['yes', 'no'],
        required:true
    },
    amount: {
        type: Number,
        required:true
    }
}, { timestamps: true });

const TradeModel = mongoose.model("Trade", TradeSchema)

export default TradeModel;