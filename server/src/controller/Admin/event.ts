import EventModel from "../../models/Events";
import TradeModel from "../../models/trade";
import WalletModel from "../../models/wallets";


export const CreateEvents = async (req: any, res: any) => {
    try {
        const { title, description, category, deadline } = req.body;
        const event = await EventModel.create({
            title,
            description,
            category,
            deadline
        })

        return res.status(200).json({ message: "Event created successfully", data: event });


    } catch (e:any) {       
        console.error(e.message);
        return res.status(500).json("Internal server error while creating event");
    }
}

export const getEvent = async (req: any, res: any) => {
    try {
        const { id } = req.params
        const event = await EventModel.findById(id)
        if (!event) { 
            return res.status(404).json("Event not found");
        }
        return res.status(200).json("fetched event", event);
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json("Internal server error while fetching events")
    }
}

export const ListEvent = async (req: any, res: any) => {
    try {
        const event = await EventModel.find();
        return res.status(200).json("fetched all events", event);
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json("Internal server error while fetching all events");
    }
}




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
      const payoutAmount = +(bet.amount * payoutPerRupee).toFixed(2);
      payouts.push({
        userId: bet.userId,
        amount: bet.amount,
        payout: payoutAmount
      });

      // Update wallet balance
      const wallet = await WalletModel.findOne({ userId: bet.userId });
      if (wallet) {
        wallet.balance += payoutAmount;
        await wallet.save();
      } else {
        await WalletModel.create({
          userId: bet.userId,
          balance: payoutAmount
        });
      }
    }

    return res.status(200).json({
      message: "Event resolved and payouts distributed",
      payouts
    });

  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json({ message: "Internal server error while paying out" });
  }
};


export const GetOdds = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const event = await EventModel.findById(id);
        if (!event) {
            return res.status(400).json("Event not found");
        }

        const yesOdds = event.yesPool === 0 ? 1 : ((event.yesPool + event.noPool) / event.yesPool).toFixed(2);
        const noOdds = event.noPool === 0 ? 1 : ((event.yesPool + event.noPool) / event.noPool).toFixed(2);

        return res.json({ yesOdds, noOdds });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json("internal server error, while getting odds");
    }
}