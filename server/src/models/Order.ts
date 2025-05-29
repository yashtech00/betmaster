import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    orderType: {
        type: String,
        enum: ['MARKET', 'LIMIT'],
        required: true
    },
    outcome: {
        type: String,
        enum: ["yes", "no"],
        required: true
    },
    side: {
        type: String,
        enum: ["BUY", "SELL"],
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "PARTIAL", "FILLED", "CANCELED", "EXPIRED"],
        default: "PENDING"
    },
    quantity: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    filledQuantity: {
        type: mongoose.Types.Decimal128,
        default: 0
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    expiresAt: Date,
    OrderBookEntry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderBookEntry"
    }
    
}, { timestamps: true });

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;