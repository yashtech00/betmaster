import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

const WalletModel = mongoose.model("Wallet", WalletSchema);
export default WalletModel;
