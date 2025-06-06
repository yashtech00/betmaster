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
        enum: ['YES', 'NO'],
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
    
}, { timestamps: true });

const TradeModel = mongoose.model("Trade", TradeSchema)

export default TradeModel;