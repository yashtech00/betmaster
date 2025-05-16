import  mongoose, { connect } from "mongoose"



const ConnectDb = () => {
    const MONGO_URL = process.env.MONGO_URl;
    try {
        mongoose.connect(MONGO_URL || "")
            .then(() => {
                console.log("mongodb connected successfully");
            })
            .catch(() => {
                console.log("mongodb disconnected");
            })
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        throw e;
    }
}

export default ConnectDb;