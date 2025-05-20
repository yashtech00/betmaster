import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        default: 500
    }
});

const WalletModel = mongoose.model("Wallet", WalletSchema);
export default WalletModel;
