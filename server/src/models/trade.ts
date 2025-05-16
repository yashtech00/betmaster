import mongoose from "mongoose";


const Schema = mongoose.Schema;

const TradeSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    eventId: {
        type: mongoose.Types.ObjectId
    },
    outcome: {
        type: String,
        enum: ['yes', 'no'],
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    }

}, { timestamps: true });

const TradeModel = mongoose.model("Trade", TradeSchema)

export default TradeModel;