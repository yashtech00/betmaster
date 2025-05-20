import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel; 