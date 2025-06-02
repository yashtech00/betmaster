import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const OrderBookEntrySchema = new Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    outcome: {
        type: String,
        enum: ["yes", "no"],
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    quantity: {
        type: mongoose.Types.Decimal128,
        required: true
    }

}, { timestamps: true });

const OrderBookEntryModel = mongoose.model("OrderBookEntry", OrderBookEntrySchema);

export default OrderBookEntryModel