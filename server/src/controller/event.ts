import cloudinary from "../lib/Cloudinary";
import EventModel from "../models/Events";
import TradeModel from "../models/trade";
import WalletModel from "../models/wallets";

export const CreateEvents = async (req: any, res: any) => {
  try {
    const { title, description, category, deadline, image } = req.body;
    console.log(image,"image");
    

    let imageUrlToUse = image;
    if (image) {
      try {
        const uploadRes = await cloudinary.uploader.upload(image, {
          folder: "courses", // Optional: organize uploads into folders
        });
        imageUrlToUse = uploadRes.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    const event = await EventModel.create({
      title,
      description,
      category,
      deadline,
      image: imageUrlToUse,
    });

    console.log(event,"create");
    

    return res
      .status(200)
      .json({ message: "Event created successfully", data: event });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json("Internal server error while creating event");
  }
};

export const getEvent = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    console.log(id,"get event by id");
    
    const event = await EventModel.findById( id );
    console.log(event,"event found");
    
    if (!event) {
      return res.status(404).json("Event not found");
    }
    console.log(event, "event ");

    return res.status(200).json({ message: "fetched event", data: event });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json("Internal server error while fetching events");
  }
};

export const ListEvent = async (req: any, res: any) => {
  try {
    console.log("before list events");
    
    const event = await EventModel.find();
    console.log(event,"after list event");
    
    return res.status(200).json({ message: "fetched all events", data: event });
  } catch (e: any) {
    console.error(e.message);
    return res
      .status(500)
      .json("Internal server error while fetching all events");
  }
};

export const ResolveOutcome = async (req: any, res: any) => {
  try {
    const { id: eventId } = req.params;
    const { result } = req.body;

    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.status !== "open") {
      return res.status(400).json({ message: "Event already resolved" });
    }

    event.result = result;
    event.status = "resolved";
    await event.save();

    const bets = await TradeModel.find({ eventId });

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
      const wallet = await WalletModel.findOne({ userId: bet.userId });
      if (wallet) {
        wallet.balance += payoutAmount;
        await wallet.save();
      } else {
        await WalletModel.create({
          userId: bet.userId,
          balance: payoutAmount,
        });
      }
    }

    return res.status(200).json({
      message: "Event resolved and payouts distributed",
      payouts,
    });
  } catch (e: any) {
    console.error(e.message);
    return res
      .status(500)
      .json({ message: "Internal server error while paying out" });
  }
};

export const GetOdds = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findById(id);
    if (!event) {
      return res.status(400).json("Event not found");
    }

    const yesOdds =
      event.yesPool === 0
        ? 1
        : ((event.yesPool + event.noPool) / event.yesPool).toFixed(2);
    const noOdds =
      event.noPool === 0
        ? 1
        : ((event.yesPool + event.noPool) / event.noPool).toFixed(2);

    return res.json({ yesOdds, noOdds });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json("internal server error, while getting odds");
  }
};

export const PlaceTrade = async (req: any, res: any) => {
  try {
    const { id: eventId } = req.params;
    console.log(eventId, "event id");

    const { outcome, amount } = req.body;
    const userId = req.user._id;
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json("event not found");
    }

    if (event.status != "open") {
      return res.status(500).json("Event is not open for trading");
    }

    console.log("userId", userId); // From req.user._id
    console.log("eventId", eventId); // From req.params
    console.log("outcome", outcome);
    console.log("amount", amount, typeof amount);

    const wallet = await WalletModel.findOne({ userId });
    console.log("wallet-", wallet);

    if (!wallet || wallet.balance < amount) {
      return res.status(500).json("Insufficient balance");
    }

    if (outcome == "yes") {
      event.yesPool += amount;
    } else if (outcome == "no") {
      event.noPool += amount;
    } else {
      return res.status(400).json("Invalid outcome. Use yes or no");
    }
    await event.save();
    const Trade = await TradeModel.create({
      userId,
      eventId,
      outcome,
      amount,
    });

    wallet.balance = wallet.balance - amount;
    await wallet.save();


    return res
      .status(200)
      .json({ message: "trade successfully" }, { data: Trade });
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json("Internal server error while trading");
  }
};


