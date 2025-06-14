"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceTrade = exports.GetOdds = exports.ResolveOutcome = exports.ListEvent = exports.getEvent = exports.CreateEvents = void 0;
const Cloudinary_1 = __importDefault(require("../lib/Cloudinary"));
const Events_1 = __importDefault(require("../models/Events"));
const trade_1 = __importDefault(require("../models/trade"));
const wallets_1 = __importDefault(require("../models/wallets"));
const CreateEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, category, deadline, image } = req.body;
        console.log(image, "image");
        let imageUrlToUse = image;
        if (image) {
            try {
                const uploadRes = yield Cloudinary_1.default.uploader.upload(image, {
                    folder: "courses", // Optional: organize uploads into folders
                });
                imageUrlToUse = uploadRes.secure_url;
            }
            catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(500).json({ message: "Failed to upload image" });
            }
        }
        const event = yield Events_1.default.create({
            title,
            description,
            category,
            deadline,
            image: imageUrlToUse,
        });
        console.log(event, "create");
        return res
            .status(200)
            .json({ message: "Event created successfully", data: event });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json("Internal server error while creating event");
    }
});
exports.CreateEvents = CreateEvents;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id, "get event by id");
        const event = yield Events_1.default.findById(id);
        console.log(event, "event found");
        if (!event) {
            return res.status(404).json("Event not found");
        }
        console.log(event, "event ");
        return res.status(200).json({ message: "fetched event", data: event });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json("Internal server error while fetching events");
    }
});
exports.getEvent = getEvent;
const ListEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("before list events");
        const event = yield Events_1.default.find();
        console.log(event, "after list event");
        return res.status(200).json({ message: "fetched all events", data: event });
    }
    catch (e) {
        console.error(e.message);
        return res
            .status(500)
            .json("Internal server error while fetching all events");
    }
});
exports.ListEvent = ListEvent;
const ResolveOutcome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: eventId } = req.params;
        const { result } = req.body;
        const event = yield Events_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        if (event.status !== "open") {
            return res.status(400).json({ message: "Event already resolved" });
        }
        event.result = result;
        event.status = "resolved";
        yield event.save();
        const bets = yield trade_1.default.find({ eventId });
        const totalPool = event.yesPool + event.noPool;
        const winningPool = result === "yes" ? event.yesPool : event.noPool;
        const winners = bets.filter((b) => b.outcome === result);
        const payoutPerRupee = totalPool / winningPool;
        const payouts = [];
        for (const bet of winners) {
            const payoutAmount = +(bet.price * payoutPerRupee).toFixed(2);
            payouts.push({
                userId: bet.userId,
                amount: bet.price,
                payout: payoutAmount,
            });
            // Update wallet balance
            const wallet = yield wallets_1.default.findOne({ userId: bet.userId });
            if (wallet) {
                wallet.balance += payoutAmount;
                yield wallet.save();
            }
            else {
                yield wallets_1.default.create({
                    userId: bet.userId,
                    balance: payoutAmount,
                });
            }
        }
        return res.status(200).json({
            message: "Event resolved and payouts distributed",
            payouts,
        });
    }
    catch (e) {
        console.error(e.message);
        return res
            .status(500)
            .json({ message: "Internal server error while paying out" });
    }
});
exports.ResolveOutcome = ResolveOutcome;
const GetOdds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const event = yield Events_1.default.findById(id);
        if (!event) {
            return res.status(400).json("Event not found");
        }
        const yesOdds = event.yesPool === 0
            ? 1
            : ((event.yesPool + event.noPool) / event.yesPool).toFixed(2);
        const noOdds = event.noPool === 0
            ? 1
            : ((event.yesPool + event.noPool) / event.noPool).toFixed(2);
        return res.json({ yesOdds, noOdds });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json("internal server error, while getting odds");
    }
});
exports.GetOdds = GetOdds;
const PlaceTrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: eventId } = req.params;
        console.log(eventId, "event id");
        const { outcome, price } = req.body;
        const userId = req.user._id;
        const event = yield Events_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json("event not found");
        }
        if (event.status != "open") {
            return res.status(500).json("Event is not open for trading");
        }
        console.log("userId", userId); // From req.user._id
        console.log("eventId", eventId); // From req.params
        console.log("outcome", outcome);
        console.log("amount", price, typeof price);
        const wallet = yield wallets_1.default.findOne({ userId });
        console.log("wallet-", wallet);
        if (!wallet || wallet.balance < price) {
            return res.status(500).json("Insufficient balance");
        }
        if (outcome == "yes") {
            event.yesPool += price;
        }
        else if (outcome == "no") {
            event.noPool += price;
        }
        else {
            return res.status(400).json("Invalid outcome. Use yes or no");
        }
        yield event.save();
        const Trade = yield trade_1.default.create({
            userId,
            eventId,
            outcome,
            price,
        });
        wallet.balance = wallet.balance - price;
        yield wallet.save();
        return res
            .status(200)
            .json({ message: "trade successfully" }, { data: Trade });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json("Internal server error while trading");
    }
});
exports.PlaceTrade = PlaceTrade;
