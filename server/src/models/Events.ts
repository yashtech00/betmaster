import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
    },
    yesPrice: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.5,
    },
    noPrice: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.5,
    },
    yesPool: {
      type: Number,
      default: 0,
    },
    noPool: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum:["solved","pending",""]
    },
    resolve: {
      
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    orderBook: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderBookEntry",
      },
    ],
    trades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trade",
      },
    ],
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel;
