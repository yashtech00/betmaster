import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderBookEntrySchema = new Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event"
    }
})