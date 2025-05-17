import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connectDb from "./db/db";
import cors from "cors"
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/user"
import EventRoutes from "./routes/events"



const app = express();
const PORT = process.env.PORT || 8001;
connectDb();


app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json());

app.use("/user", UserRoutes);
app.use("/events",EventRoutes)

app.listen(PORT,() => {
    console.log(`server is connected to ${PORT}`);
})