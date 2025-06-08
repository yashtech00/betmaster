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
      enum:["open","resolved","close"]
    },
    result: {
      type: String,
      enum: ["YES", "NO", null],
      default: null
    },
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
