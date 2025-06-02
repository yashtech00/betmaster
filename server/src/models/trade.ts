import mongoose from "mongoose";


const Schema = mongoose.Schema;

const TradeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        
    },
    outcome: {
        type: String,
        enum: ['yes', 'no'],
        required:true
    },
    quantity: {
        type: Number,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    orderBookEntry: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"OrderBookEntry"
    }
}, { timestamps: true });

const TradeModel = mongoose.model("Trade", TradeSchema)

export default TradeModel;